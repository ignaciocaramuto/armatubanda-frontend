import { Instrument } from "./instrument.interface";
import { ProfileImage } from "./profile-image.interface";
import { Review } from "./review.interface";

export interface Musician {
    id: number;
    musicianContactInformation: ContactInformation;
    intruments: Instrument[];
    profileImage: ProfileImage;
    reviews: Review[]
}

export interface ContactInformation {
    name: string;
    lastname: string;
    stageName: string;
    bio: string;
    country: string;
    city: string;
    phoneNumber: string;
    webSite: string;
    socialMediaLink: string;
}