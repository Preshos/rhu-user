export class HerbInfo {
    id: string;
    herbname?: string;
    description?: string;
    other_name?: string;
    benefits?:string;
    uses?:{
        title: string;
        content: string;
        procedure:string;
      }[];
    // {
    //   desc_title:string;
    //   desc_content:string;
    // }[];
    photourl?:string;
    beware?:string;
    keywords?: string[];
}
  
  