
'use strict';
class gdprCookie {


  constructor() {
    this._title='Cookies';
    this._cookie_secure=2;
    this._main_container;
    this._listeners_added=false;
    this._cookie;
    this._types=new Array({'type':'mandatory','text':'Cookies λειτουργικότητας','default':true,'detailsText':'Τα cookies αυτά είναι απαραίτητα γιατί επιτρέπουν την πλοήγηση στον ιστότοπό μας καθώς και τη χρήση των λειτουργιών του ιστότοπου.'});
	  this._cookie_name='gdpr_cookie';
	  this._expires=30; // a year
    this._btn_settings;
    this._cookie_path='/';
    this._btn_settings_text;
    this._btn_hide_settings;
    this._btn_hide_settings_text;
    this._btn_accept;
    this._btn_accept1;
    this._btn_accept_text;
    this._intro_text='';
    this._settings_text='';
    this._class_prefix='gdpr-cookie';
    this._position='bottom';
    this.settingscont;
    this.messagecont;
    //console.log(this.getCookie(this.cookie_name))
  }
  get cookie() {
    return this._cookie;
  }
  get cookie_name() {
    return this._cookie_name;
  }
  set cookie_name(value) {

    this._cookie_name = value;

  }

  get expires() {
    return this._expires;
  }
  set expires(value) {
    if(/^[0-9]*$/i.test(value)){
      this._expires = parseInt(value);
    }else{
      throw new Error('Only numbers allowed')
    }

  }
  get types() {
    return this._types;
  }
  set types(value) {
    if(Array.isArray(value)){
      for(let i=0;i<value.length;i++){
        this._types.push(value[i]);
      }
     // this._types = value;
    }else{
      throw new Error('Value must be an array of objects')
    }

  }



  get position() {
    return this._position;
  }
  set position(value) {
      if(value=='top' || value=='bottom' || value=='full'){
    this._position = value;
    this._class_prefix=`gdpr-cookie-${value}`;
      }
  }
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }
  get intro_text() {
    return this._intro_text;
  }
  set intro_text(value) {
    this._intro_text = value;
  }

  get cookie_type_mandatory_text() {
    return this._types[0].text;
  }
  set cookie_type_mandatory_text(value) {
    this._types[0].text= value;
  }

  get cookie_type_mandatory_detailsText() {
    return this._types[0].detailsText;
  }
  set cookie_type_mandatory_detailsText(value) {
    this._types[0].detailsText= value;
  }

  get settings_text() {
    return this._settings_text;
  }
  set settings_text(value) {
    this._settings_text = value;
  }


  get btn_settings_text() {
    return this._btn_settings_text;
  }
  set btn_settings_text(value) {
    this._btn_settings_text = value;
  }

  get btn_hide_settings_text() {
    return this._btn_hide_settings_text;
  }
  set btn_hide_settings_text(value) {
    this._btn_hide_settings_text = value;
  }

  get btn_accept_text() {
    return this._btn_accept_text;
  }
  set btn_accept_text(value) {
    this._btn_accept_text = value;
  }

  get cookie_path() {
    return this._cookie_path;
  }
  set cookie_path(value) {
    this._cookie_path = value;
  }

  get cookie_secure() {
    return this._cookie_secure;
  }
  set cookie_secure(value) {
    this._cookie_secure = value;
  }

  getCookie(name) {
    name = name + "=";
    const cookies = document.cookie.split(';');
    for(let i = 0; i <cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return JSON.parse(cookie.substring(name.length,cookie.length));
        }
    }
    return undefined;
  }

	setCookie(name=this._cookie_name, value, expirydays=this._expires,path=this._cookie_path) {
	 let d = new Date();
	 d.setTime(d.getTime() + (expirydays*24*60*60*1000));
   let expires = "expires="+ d.toUTCString();
   let sec='';

		if(this._cookie_secure==2){
			if(location.protocol){
				if (location.protocol == 'https:'){
				  sec=';secure';
				}
			}
		}else if(this._cookie_secure==true){
			sec=';secure';
		}



	 document.cookie = name + "=" + JSON.stringify(value) + "; " + expires+ "; path=" + path+sec;
	}

    deleteCookie(name){
        setCookie(name,"",-1);
    }


    check(){
      this._cookie=this.getCookie(this._cookie_name);

        if(!this._cookie || (this._cookie && !this._cookie.accepted)){
          let cookieObj={'accepted':false};
          if(this._types.length>1){
            for(let i=1;i<this._types.length;i++){
              cookieObj[`${this._types[i].type}`]=this._types[i].default;
            }
          }
          this.setCookie(this._cookie_name,cookieObj,this._expires);
          this._cookie=this.getCookie(this._cookie_name);
        }
        document.addEventListener('DOMContentLoaded', (e) => {
            this.domLoaded();
          });


    }

    domLoaded (e) {
      this._main_container= document.createElement('div');
       this._main_container.style.display='none';
      this._main_container.classList.add(`gdpr-cookie-container`);
      this._main_container.classList.add(`${this._class_prefix}-container`);



        let innercont = document.createElement('div');
        innercont.classList.add(`gdpr-cookie-inner-container`);

        let titl=document.createElement('h2');
        titl.id='gdpr-cookie-title';
        titl.setAttribute('align','center');
        titl.innerHTML=this._title;
        innercont.appendChild(titl);

        this.messagecont = document.createElement('div');

        this.messagecont.id='gdpr-cookie-message';
        //messagecont.innerHTML =this._intro_text;
        let tbl     = document.createElement("table");
        let tblBody = document.createElement("tbody");

        // cells creation
        for (let j = 0; j < 1; j++) {
            // table row creation
            let row = document.createElement("tr");

            for (let i = 0; i < 2; i++) {
              let cell;
              let cellText;

              cell = document.createElement("td");
              cell.setAttribute('valign','middle');
              if(i==0){
              cell.setAttribute('align','left');
              cell.innerHTML=this._intro_text;
              }else{

                 this._btn_settings=document.createElement('button');
                 this._btn_settings.id='gdpr-show-cookie-settings';
                 this._btn_settings.innerText=this._btn_settings_text;
                cell.appendChild(this._btn_settings);

              }

                row.appendChild(cell);
            }

            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);

        this.messagecont.appendChild(tbl);





        this.settingscont = document.createElement('div');
        this.settingscont.style.display='none';
        this.settingscont.id='gdpr-cookie-settings';
        //messagecont.innerHTML =this._intro_text;
        tbl     = document.createElement("table");
        tblBody = document.createElement("tbody");

        // cells creation
        for (let j = 0; j < 1; j++) {
            // table row creation
            let row = document.createElement("tr");

            for (let i = 0; i < 2; i++) {
              let cell;
              let cellText;

              cell = document.createElement("td");
              cell.setAttribute('valign','middle');
              if(i==0){
              cell.setAttribute('align','left');
              let txt=document.createElement('p');
              txt.innerHTML=this._settings_text;
                cell.appendChild(txt);

               let tbl1     = document.createElement("table");
                let tblBody1 = document.createElement("tbody");
                let row1;
                let cell1;
                    let checkbox;
                    let txt2;


                for (let j1 = 0; j1 < this._types.length; j1++) {
                  row1 = document.createElement("tr");
                  for (let i1 = 0; i1 < 2; i1++) {

                    cell1 = document.createElement("td");
                    cell1.setAttribute('valign','top');
                      if(i1==0){
                        checkbox = document.createElement('input');
                        checkbox.type = "checkbox";
                        if(j1==0){
                          checkbox.disabled=true;
                          checkbox.checked = true;
                        }else{
                          checkbox.checked = this._cookie[this._types[j1].type];
                        }
                        checkbox.id = `gdpr-cookie-checkbox-${this._types[j1].type}`;

                        cell1.appendChild(checkbox);
                      }else{
                        txt2=document.createTextNode(this._types[j1].text);
                        cell1.appendChild(txt2);
                        txt2=document.createElement('p');
                        txt2.classList.add(`details-txt`);
                        txt2.innerHTML=`<i>${this._types[j1].detailsText}</i>`;
                        cell1.appendChild(txt2);
                      }

                    row1.appendChild(cell1);
                  }


                  tblBody1.appendChild(row1);
                }
                tbl1.appendChild(tblBody1);
                cell.appendChild(tbl1);
              }else{
                let p;

                p=document.createElement('p');

                 this._btn_hide_settings=document.createElement('button');
                 this._btn_hide_settings.id='gdpr-hide-cookie-settings';
                 this._btn_hide_settings.innerText=this._btn_hide_settings_text;
                 p.appendChild(this._btn_hide_settings);
                cell.appendChild(p);


                this._btn_accept1=document.createElement('button');
                this._btn_accept1.id='gdpr-accept-btn';
                this._btn_accept1.innerText=this._btn_accept_text;
               cell.appendChild(this._btn_accept1);



              }

                row.appendChild(cell);
            }

            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);

        this.settingscont.appendChild(tbl);



















        innercont.appendChild(this.messagecont);
        innercont.appendChild(this.settingscont);


        this._main_container.appendChild(innercont);
        //document.body.appendChild(this._main_container);
        if (document.body.firstChild){
          document.body.insertBefore(this._main_container, document.body.firstChild);
        }else{
        document.body.appendChild(this._main_container);
        }
        this.showcookie();

    }

    showcookie(){
      if(!this._cookie.accepted){
        this._main_container.style.display='block';
      }


      this.addlisteners();

    }





    addlisteners() {
      if(!this._listeners_added){
        this._listeners_added=true;

      this._btn_hide_settings.addEventListener('click', (e) => {
        this.settingscont.style.display='none';
        this.messagecont.style.display='block';

      });

      this._btn_settings.addEventListener('click', (e) => {
        this.settingscont.style.display='block';
        this.messagecont.style.display='none';

      });


      this._btn_accept1.addEventListener('click', (e) => {
        this.settingscont.style.display='block';
        this.messagecont.style.display='none';
        this._cookie.accepted=true;
      if(this._types.length>1){
        for(let i=1;i<this._types.length;i++){
          this._cookie[`${this._types[i].type}`]=document.getElementById(`gdpr-cookie-checkbox-${this._types[i].type}`).checked;
        }
      }
        this.setCookie(this._cookie_name, this._cookie,this._expires);




        this._main_container.style.display='none';

      });




    }


     }





}







