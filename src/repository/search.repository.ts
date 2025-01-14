import { Model } from "mongoose";
import { ISearchRepository, SearchFilters, SearchMenteeFilters, SearchMenteeResult, SearchPostFilters, SearchPostResult, SearchResult } from "../interfaces/repositories/ISearch.repository";
import MentorModel from "../frameworks/models/mentor.model";
import SkillModel from "../frameworks/models/skill.model";
import SubscriptionModel from "../frameworks/models/subscription.model";
import PostModel from "../frameworks/models/post.model";
import UserModel from "../frameworks/models/user.model";

export default class SearchRepository implements ISearchRepository {
  private mentorModel: typeof MentorModel;
  private skillModel: typeof SkillModel;
  private subscriptionModel: typeof SubscriptionModel;
  private postModel: typeof PostModel;
  private userModel: typeof UserModel;

  constructor(
    mentorModel: typeof MentorModel,
    skillModel: typeof SkillModel,
    subscriptionModel: typeof SubscriptionModel,
    postModel: typeof PostModel,
    userModel: typeof UserModel
  ) {
    this.mentorModel = mentorModel;
    this.skillModel = skillModel;
    this.subscriptionModel = subscriptionModel;
    this.postModel = postModel;
    this.userModel = userModel;
  }

  async searchMentors(filters: SearchFilters): Promise<SearchResult> {
    try {
      console.log(filters)
      const {
        search,
        skills,
        jobTitle,
        company,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10
      } = filters;

      // Build the base query
      const baseQuery: any = {
        status: 'approved',
        isBlocked: false
      };

      // Add text search if provided
      if (search) {
        baseQuery.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { jobTitle: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } }
        ];
      }

      // Add specific filters
      if (jobTitle) {
        baseQuery.jobTitle = { $regex: jobTitle, $options: 'i' };
      }

      if (company) {
        baseQuery.company = { $regex: company, $options: 'i' };
      }

      // Handle skills filter
      if (skills && skills.length > 0) {
        const skillObjects = await this.skillModel.find({
          name: { $in: skills },
          isListed: true
        });
        baseQuery.skills = {
          $all: skillObjects.map(skill => skill._id)
        };
      }

      // First get mentor IDs that match the subscription price range
      let mentorIds = undefined;
      if (minPrice !== undefined || maxPrice !== undefined) {
        const priceQuery: any = {};
        if (minPrice !== undefined) priceQuery.price = { $gte: minPrice };
        if (maxPrice !== undefined) priceQuery.price = { ...priceQuery.price, $lte: maxPrice };
        
        const subscriptions = await this.subscriptionModel.find(priceQuery);
        mentorIds = subscriptions.map(sub => sub.mentorId);
        baseQuery._id = { $in: mentorIds };
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Execute the query with population
      const [mentors, total] = await Promise.all([
        this.mentorModel
          .find(baseQuery)
          .populate('skills')
          .skip(skip)
          .limit(limit)
          .lean(),
        this.mentorModel.countDocuments(baseQuery)
      ]);

      // Get subscription information for returned mentors
      const mentorSubscriptions = await this.subscriptionModel.find({
        mentorId: { $in: mentors.map(mentor => mentor._id) }
      }).lean();

      // Format the response
      const formattedMentors = mentors.map(mentor => {
        const mentorSubs = mentorSubscriptions.filter(
          sub => sub.mentorId.toString() === mentor._id.toString()
        );

        return {
          id: mentor._id,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          bio: mentor.bio,
          jobTitle: mentor.jobTitle,
          company: mentor.company,
          location: mentor.location,
          skills: mentor.skills.map((skill: any) => ({
            id: skill._id,
            name: skill.name
          })),
          profilePicture: mentor.profilePicture,
          rating: mentor.rating,
          subscriptions: mentorSubs.map(sub => ({
            type: sub.type,
            price: sub.price
          }))
        };
      });

      console.log(formattedMentors)

      return {
        mentors: formattedMentors,
        total
      };
    } catch (error) {
      throw error;
    }
  }

  async searchMentees(filters: SearchMenteeFilters): Promise<SearchMenteeResult> {
    try {
      const { name = '', page = 1, limit = 10 } = filters;
  
      // Only add the name filter if there is a search query
      const baseQuery: any = {
        isBlocked: false,
        ...(name ? { name: { $regex: name, $options: 'i' } } : {})
      };
  
      const skip = (page - 1) * limit;
  
      const [mentees, total] = await Promise.all([
        this.userModel.find(baseQuery).skip(skip).limit(limit).lean(),
        this.userModel.countDocuments(baseQuery)
      ]);
  
      return {
        mentees,
        total
      };
    } catch (error) {
      throw error;
    }
  }
  
  async searchPosts(filters: SearchPostFilters): Promise<SearchPostResult> {
    try {
      const { title = '', page = 1, limit = 10 } = filters;
  
      // Only add the title filter if there is a search query
      const baseQuery: any = {
        ...(title ? { title: { $regex: title, $options: 'i' } } : {})
      };
  
      const skip = (page - 1) * limit;
  
      const [posts, total] = await Promise.all([
        this.postModel.find(baseQuery).skip(skip).limit(limit).lean(),
        this.postModel.countDocuments(baseQuery)
      ]);
  
      return {
        posts,
        total
      };
    } catch (error) {
      throw error;
    }
  }

  
}