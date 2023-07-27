export interface MusicianContactInformationNameMartinLastnamePereyraStageNameMartoBioEstaEsMiBioCountryArgentinaCityRosarioPhoneNumber34151WebSiteWebsiteCOMSocialMediaLinkLinkedinCOMInstrumentsNameGuitarraNameViolin {
    musicianContactInformation: MusicianContactInformation;
    instruments:                Instrument[];
}

export interface Instrument {
    id: BigInteger,
    name: string;
}

export interface MusicianContactInformation {
    name:            string;
    lastname:        string;
    stageName:       string;
    bio:             string;
    country:         string;
    city:            string;
    phoneNumber:     string;
    webSite:         string;
    socialMediaLink: string;
}
