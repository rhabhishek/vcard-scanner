export class Contact{
  public address : JSON;
  public fname : string;
  public lname : string;
  public phone : JSON;
  public email : string;


  constructor(jsonObj:any) {
    if(jsonObj.address[0].item)
    this.address = jsonObj.address[0].item;
    if(jsonObj.name[0].item.given_name)
    this.fname = jsonObj.name[0].item.given_name;
    if(jsonObj.name[0].item.family_name)
    this.lname = jsonObj.name[0].item.family_name;
    if(jsonObj.telephone)
    this.phone = jsonObj.telephone;
    if(jsonObj.email[0].item)
    this.email = jsonObj.email[0].item;
  }

  toString(){
    let displayString:string;

    displayString='Name: '+JSON.stringify(this.fname)+' '+JSON.stringify(this.lname);
    displayString+='\n';
    displayString+='Phone: '+JSON.stringify(this.phone);
    displayString+='\n';
    displayString+='Email: '+JSON.stringify(this.email);
    displayString+='\n';
    displayString+='Address: '+JSON.stringify(this.address);

    return displayString;
  }
}
