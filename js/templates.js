
class TemplateClass {
  voters_count(info) {
    return `<h2>` + info.admin_div + `</h2>
      <div class="row-wrap">
        <div>जिल्ला</div>
        <div>`+ info.district + `</div>
      </div>
      <div class="row-wrap">
        <div>प्रदेश</div>
        <div>`+ ProvinceNepaliName[info.province] + `</div>
      </div>
      <div class="row-wrap">
        <div>मतदाता</div>
        <div>
          `+ info["2079_total_np"] + `
        </div>
      </div>
      <span class="voters-info">(महिला: `+ info["2079_female_np"] + `, पुरुष: ` + info["2079_male_np"] + `, अन्य: ` + info["2079_others_np"] + ` )</span>
      </div>`;
  }

  mayor_name(info) {
    return `<h2>` + info.admin_div + `</h2>
      <div class="row-wrap">
        <div>जिल्ला</div>
        <div>`+ info.district + `</div>
      </div>
      <div class="row-wrap">
        <div>प्रदेश</div>
        <div>`+ ProvinceNepaliName[info.province] + `</div>
      </div>
      <div class="row-wrap">
        <div>मतदाता</div>
        <div>
          `+ info["2079_total_np"] + `
        </div>
      </div>
      <span class="voters-info">(महिला: `+ info["2079_female_np"] + `, पुरुष: ` + info["2079_male_np"] + `, अन्य: ` + info["2079_others_np"] + ` )</span>
      </div>`;
  }

  mayor_party(info) {
    return `<h2>` + info["body"]["Constituency"] + `</h2>

        <div class="row-wrap">
        <div style="flex:3">
            <div class="row">
              <div class="col-md-3">
                <img class="candidate_img" src="`
                + info["body"]["1stPhoto"] +`" />
              </div>
              <div class="col-md-9 candidate_info">
                <p class="candidate_name">`+ info["body"]["1stCandidate"]+ `</p>
                <p class="candidate_party">`+ Data.PartiesById[info["body"]["1stPartyID"]].party_nepali_name +`</p>
              </div>
            </div>
          </div>
          <div>
          <div class="candidate_vote_count">
          ` +
          ( Data.PartiesById[info["body"]["1stPartyID"]].party_symbol ?
           `<img class="party_image" src="`+ Data.PartiesById[info["body"]["1stPartyID"]].party_symbol +`">` : "")
           +`
          </div>
        </div>
        </div>
        
        <div class="row-wrap">
          <div style="flex:3">
            <div class="row">
              <div class="col-md-3">
                <img class="candidate_img" src="`
                +info["body"]["2ndPhoto"]+`" />
              </div>
              <div class="col-md-9 candidate_info">
                <p class="candidate_name">`+ info["body"]["2ndCandidate"]+ `</p>
                <p class="candidate_party">`+ Data.PartiesById[info["body"]["2ndPartyID"]].party_nepali_name +`</p>
              </div>
            </div>
          </div>
          <div>
          <div class="candidate_vote_count">
          ` +
          ( Data.PartiesById[info["body"]["2ndPartyID"]].party_symbol ?
           `<img class="party_image" src="`+ Data.PartiesById[info["body"]["2ndPartyID"]].party_symbol +`">` : "")
           +`
          </div>
          
        </div>
        </div>

        <div class="row-wrap">
         
              <div class="col-md-6">
                <button class="button" onclick="window.location.href='`+ Data.PhotoLinkPage[info["body"]["ConstCode"]].PageLink +`';">FULL DETAILS
                </button>
              </div>
              
           
        </div>` 

        
        


        // <div>
        //       `+toNepaliDigits(info["body"]["1stTotalVoteReceived"])+`
        //     </div>
        //<span>`+toNepaliDigits(info["body"]["1st%Vote"])+`</span>
    //     <div>
    //     <div class="candidate_vote_count">
    //       `+ getVictoryIcon("winner") +`
    //       <span>`+toNepaliDigits(info.body.acquired_vote1)+`</span>`+
    //       ( Data.Parties[info.body.partycode1].party_logo ?
    //      `<img class="party_image" src="`+ Data.Parties[info.body.partycode1].party_logo +`">`:"")
    //      +`</div>
    // </div>

      // + (info["body"].unopposed ?
      //   `<div class="text-center" style="margin:10px">` + info["body"].unopposed + `</div>`
      //   :
      //   `<div class="row-wrap">
      //         <div>उम्मेदवार</div>
      //         <div>
      //            `+ info["body"]["2ndCandidate"] + ", " + Data.PartiesById[info["body"]["2ndPartyID"]].party_nepali_name + `
      //         </div>
      //     </div>
         
      //   </div>`


      // )
      // + (info["body"].unopposed ?
      //   `<div class="text-center" style="margin:10px">` + info["body"].unopposed + `</div>`
      //   :
      //   `<div class="row-wrap">
      //         <div>उम्मेदवार</div>
      //         <div>
      //            `+ info["body"]["3rdCandidate"] + ", " + Data.PartiesById[info["body"]["3rdPartyID"]].party_nepali_name + `
      //         </div>
      //     </div>`

      // );
  }

  mayor_gender(info) {
    return `<h2>` + info["body"]["Constituency"] + `</h2>
        <div class="row-wrap">
          <div>`+ "उम्मेदवार" + `</div>
          <div>
          `+ info["body"]["1stCandidate"] + " ( " + Data.PartiesById[info["body"]["1stPartyID"]].party_nepali_name + " )" + `
          </div>
        </div>` +
      `<div class="row-wrap">
          <div>लिङ्ग</div>
          <div>
            `+ (info["body"]["1stGender"] == "M" ? "पुरुस" : "महिला") + `
          </div>
        </div>`
      + (info["body"].unopposed ?
        `<div class="text-center" style="margin:10px">` + info["body"].unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
              `+ info["body"]["2ndCandidate"] + " ( " + Data.PartiesById[info["body"]["2ndPartyID"]].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>लिङ्ग</div>
            <div>
              `+ (info["2ndGender"] == "M" ? "पुरुस" : "महिला") + `
            </div>
          </div>`


      )
      + (info["body"].unopposed ?
        `<div class="text-center" style="margin:10px">` + info["body"].unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
              `+ info["body"]["3rdCandidate"] + " ( " + Data.PartiesById[info["body"]["3rdPartyID"]].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>लिङ्ग</div>
            <div>
              `+ (info["3rdGender"] == "M" ? "पुरुस" : "महिला") + `
            </div>
          </div>`

      )
      ;
  }

  mayor_age(info) {
    return `<h2>` + info["body"]["Constituency"] + `</h2>
        <div class="row-wrap">
          <div>`+ "उम्मेदवार" + `</div>
          <div>
          `+ info["body"]["1stCandidate"] + " ( " + Data.PartiesById[info["body"]["1stPartyID"]].party_nepali_name + " )" + `
          </div>
        </div>` +
      `<div class="row-wrap">
          <div>उमेर</div>
          <div>
            `+ toNepaliDigits(info["body"]["1stAge"]) + " वर्ष" + `
          </div>
        </div>`
      + (info["body"].unopposed ?
        `<div class="text-center" style="margin:10px">` + info["body"].unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
              `+ info["body"]["2ndCandidate"] + " ( " + Data.PartiesById[info["body"]["2ndPartyID"]].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>उमेर</div>
            <div>
              `+ toNepaliDigits(info["body"]["2ndAge"]) + " वर्ष" + `
            </div>
          </div>`

      )
      + (info["body"].unopposed ?
        `<div class="text-center" style="margin:10px">` + info["body"].unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
              `+ info["body"]["3rdCandidate"] + " ( " + Data.PartiesById[info["body"]["2ndPartyID"]].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>उमेर</div>
            <div>
              `+ toNepaliDigits(info["body"]["2ndAge"]) + " वर्ष" + `
            </div>
          </div>`

      )
      ;
  }

  mayor_margin(info) {
    return `<h2>` + info["body"]["Constituency"] + `</h2>
        
        <div class="row-wrap">
          <div>`+ "उम्मेदवार" + `</div>
          <div>
          `+ info["body"]["1stCandidate"] + " ( " + Data.PartiesById[info["body"]["1stPartyID"]].party_nepali_name + " )" + `
          </div>
        </div>
        <div class="row-wrap">
          <div>प्राप्त मत</div>
          <div>
          `+ toNepaliDigits(info["body"]["1stTotalVoteReceived"]) + `
          </div>
        </div>`
      + (info["body"].unopposed ?
        `<div class="text-center" style="margin:10px">` + info["body"].unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
              `+ info["body"]["2ndCandidate"] + " ( " + Data.PartiesById[info["body"]["2ndPartyID"]].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>मतान्तर</div>
            <div>
              `+ toNepaliDigits(info["body"]["1stTotalVoteReceived"] - info["body"]["2ndTotalVoteReceived"]) + `
            </div>
          </div>`

      )
      // + (info["body"].unopposed ? 
      //   `<div class="text-center" style="margin:10px">`+info["body"].unopposed+`</div>` 
      //   :
      //   `<div class="row-wrap">
      //       <div>तेश्रो</div>
      //       <div>
      //       `+info["body"]["3rdCandidate"]+ " ( "+ Data.PartiesById[info["body"]["3rdPartyID"]].party_nepali_name + " )"+`
      //       </div>
      //   </div>` +
      //   `<div class="row-wrap">
      //     <div>मतान्तर</div>
      //     <div>
      //       `+ toNepaliDigits(info["body"]["1stTotalVoteReceived"] - info["body"]["3rdTotalVoteReceived"]) +`
      //     </div>
      //   </div>`

      //   )  
      ;
  }

  vice_mayor_party(info) {
    return `<h2>` + info.administrative_div1 + `</h2>
        <div class="row-wrap">
          <div>जिल्ला</div>
          <div>`+ info.district + `</div>
        </div>
        <div class="row-wrap">
          <div>प्रदेश</div>
          <div>`+ ProvinceNepaliName[info.province] + `</div>
        </div>
        <div class="row-wrap">
          <div>`+ info.position1 + `</div>
          <div>
            `+ info.candidate1 + " ( " + Data.Parties[info.partycode1].party_nepali_name + " )" + `
          </div>
        </div>
        <div class="row-wrap">
          <div>प्राप्त मत</div>
          <div>
            `+ toNepaliDigits(info.acquired_vote1) + `
          </div>
        </div>`
      + (info.unopposed ?
        `<div class="text-center" style="margin:10px">` + info.unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
                `+ info.candidate_name2 + " ( " + Data.Parties[info.partycode2].party_nepali_name + " )" + `
              </div>
          </div>`

      );
  }

  vice_mayor_gender(info) {
    return `<h2>` + info.administrative_div1 + `</h2>
        <div class="row-wrap">
          <div>जिल्ला</div>
          <div>`+ info.district + `</div>
        </div>
        <div class="row-wrap">
          <div>प्रदेश</div>
          <div>`+ ProvinceNepaliName[info.province] + `</div>
        </div>
        <div class="row-wrap">
          <div>`+ info.position1 + `</div>
          <div>
            `+ info.candidate1 + " ( " + Data.Parties[info.partycode1].party_nepali_name + " )" + `
          </div>
        </div>
        <div class="row-wrap">
          <div>प्राप्त मत</div>
          <div>
            `+ toNepaliDigits(info.acquired_vote1) + `
          </div>
        </div>` +
      `<div class="row-wrap">
          <div>लिङ्ग</div>
          <div>
            `+ (info.gender1 == "M" ? "पुरुस" : "महिला") + `
          </div>
        </div>`
      + (info.unopposed ?
        `<div class="text-center" style="margin:10px">` + info.unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
                `+ info.candidate_name2 + " ( " + Data.Parties[info.partycode2].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>लिङ्ग</div>
            <div>
              `+ (info.gender2 == "M" ? "पुरुस" : "महिला") + `
            </div>
          </div>`

      );
  }

  vice_mayor_age(info) {
    return `<h2>` + info.administrative_div1 + `</h2>
        <div class="row-wrap">
          <div>जिल्ला</div>
          <div>`+ info.district + `</div>
        </div>
        <div class="row-wrap">
          <div>प्रदेश</div>
          <div>`+ ProvinceNepaliName[info.province] + `</div>
        </div>
        <div class="row-wrap">
          <div>`+ info.position1 + `</div>
          <div>
            `+ info.candidate1 + " ( " + Data.Parties[info.partycode1].party_nepali_name + " )" + `
          </div>
        </div>
        <div class="row-wrap">
          <div>प्राप्त मत</div>
          <div>
            `+ toNepaliDigits(info.acquired_vote1) + `
          </div>
        </div>` +
      `<div class="row-wrap">
          <div>उमेर</div>
          <div>
            `+ toNepaliDigits(info.age1) + " वर्ष" + " (उमेर समूह: " + toNepaliDigits(info.age_bracket1) + "   वर्ष)" + `
          </div>
        </div>`
      + (info.unopposed ?
        `<div class="text-center" style="margin:10px">` + info.unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
                `+ info.candidate_name2 + " ( " + Data.Parties[info.partycode2].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>उमेर</div>
            <div>
              `+ toNepaliDigits(info.age2) + " वर्ष" + " (उमेर समूह: " + toNepaliDigits(info.age_bracket2) + "   वर्ष)" + `
            </div>
          </div>`

      );
  }

  vice_mayor_margin(info) {
    return `<h2>` + info.administrative_div1 + `</h2>
        <div class="row-wrap">
          <div>जिल्ला</div>
          <div>`+ info.district + `</div>
        </div>
        <div class="row-wrap">
          <div>प्रदेश</div>
          <div>`+ ProvinceNepaliName[info.province] + `</div>
        </div>
        <div class="row-wrap">
          <div>`+ info.position1 + `</div>
          <div>
            `+ info.candidate1 + " ( " + Data.Parties[info.partycode1].party_nepali_name + " )" + `
          </div>
        </div>
        <div class="row-wrap">
          <div>प्राप्त मत</div>
          <div>
            `+ toNepaliDigits(info.acquired_vote1) + `
          </div>
        </div>`
      + (info.unopposed ?
        `<div class="text-center" style="margin:10px">` + info.unopposed + `</div>`
        :
        `<div class="row-wrap">
              <div>उम्मेदवार</div>
              <div>
                `+ info.candidate_name2 + " ( " + Data.Parties[info.partycode2].party_nepali_name + " )" + `
              </div>
          </div>` +
        `<div class="row-wrap">
            <div>मतान्तर</div>
            <div>
              `+ toNepaliDigits(info.acquired_vote1 - info.acquired_vote2) + `
            </div>
          </div>`

      );
  }


  c_mayor_candidate(info) {
    var count = info.body["अन्य"] + Object.keys(info.body).length - 1;
    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>` +
      `<div class="position" style="margin:10px 15px; font-size: 15px;"> ` + $('#c_mayor_select option:selected').text() + ` उम्मेदवारी </div> `
      + getPopupBodyDiv(info.body) +
      `<div class="text-center total-umd" style="margin:10px">प्रमुख उम्मेदवार संख्या: ` + toNepaliDigits(count) + `</div> `;
  }

  c_mayor_gender(info) {
    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>`
      + `<div class="row-wrap">
        <div>`+ $('#c_mayor_select option:selected').text() + ` उम्मेदवारी</div>
        <div>`+ toNepaliDigits(info.body["total"]) + `</div>
      </div>
    <div class="row-wrap">
    <div>`+ $('#c_filter_select_1 option:selected').text() + `</div>
      <div>`+ toNepaliDigits(info.body["count"]) + `</div>
    </div>`
  }

  c_mayor_age(info) {

    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>`
      + `<div class="row-wrap">
        <div>`+ $('#c_mayor_select option:selected').text() + ` उम्मेदवारी</div>
        <div>`+ toNepaliDigits(info.body["total"]) + `</div>
      </div>
    <div class="row-wrap">
    <div>`+ $('#c_filter_select_1 option:selected').text() + `</div>
      <div>`+ toNepaliDigits(info.body["count"]) + `</div>
    </div>`
  }

  c_vice_mayor_candidate(info) {
    var count = info.body["अन्य"] + Object.keys(info.body).length - 1;
    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>` +
      `<div class="position" style="margin:10px 15px; font-size: 15px;"> ` + $('#c_mayor_select option:selected').text() + ` उम्मेदवारी </div> `
      + getPopupBodyDiv(info.body) +
      `<div class="text-center total-umd" style="margin:10px">उपप्रमुख उम्मेदवार संख्या: ` + toNepaliDigits(count) + `</div> `;
  }

  c_vice_mayor_gender(info) {

    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>`
      + `<div class="row-wrap">
        <div>`+ $('#c_mayor_select option:selected').text() + ` उम्मेदवारी</div>
        <div>`+ toNepaliDigits(info.body["total"]) + `</div>
      </div>
    <div class="row-wrap">
    <div>`+ $('#c_filter_select_1 option:selected').text() + `</div>
      <div>`+ toNepaliDigits(info.body["count"]) + `</div>
    </div>`
  }

  c_vice_mayor_age(info) {

    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>`
      + `<div class="row-wrap">
        <div>`+ $('#c_mayor_select option:selected').text() + ` उम्मेदवारी</div>
        <div>`+ toNepaliDigits(info.body["total"]) + `</div>
      </div>
    <div class="row-wrap">
    <div>`+ $('#c_filter_select_1 option:selected').text() + `</div>
      <div>`+ toNepaliDigits(info.body["count"]) + `</div>
    </div>`
  }

  ward_president_candidate(info) {
    var count = info.body["अन्य"];
    Object.keys(info.body).forEach(function (k) {
      count += info.body[k];
    })
    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>` +
      `<div class="position" style="margin:10px 15px; font-size: 15px;"> ` + $('#c_mayor_select option:selected').text() + ` उम्मेदवारी </div> `
      + getPopupBodyDiv(info.body) +
      `<div class="text-center total-umd" style="margin:10px">वडा अध्यक्ष उम्मेदवार संख्या: ` + toNepaliDigits(count) + `</div> `;
  }

  ward_president_gender(info) {

    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>`
      + `<div class="row-wrap">
        <div>`+ $('#c_mayor_select option:selected').text() + ` उम्मेदवारी</div>
        <div>`+ toNepaliDigits(info.body["total"]) + `</div>
      </div>
    <div class="row-wrap">
    <div>`+ $('#c_filter_select_1 option:selected').text() + `</div>
      <div>`+ toNepaliDigits(info.body["count"]) + `</div>
    </div>`
  }

  ward_president_age(info) {

    return `<h2>` + Data.Municipalities[info.header.lcode] + `, ` + Data.Districts[info.header.lcode.toString().substring(0, 3)] + `</h2>`
      + `<div class="row-wrap">
        <div>`+ $('#c_mayor_select option:selected').text() + ` उम्मेदवारी</div>
        <div>`+ toNepaliDigits(info.body["total"]) + `</div>
      </div>
    <div class="row-wrap">
    <div>`+ $('#c_filter_select_1 option:selected').text() + `</div>
      <div>`+ toNepaliDigits(info.body["count"]) + `</div>
    </div>`
  }



}
var Template = new TemplateClass()

var Templates = {
  mayor_name: Template.mayor_name,
  mayor_party: Template.mayor_party,
  mayor_age: Template.mayor_age,
  mayor_gender: Template.mayor_gender,
  mayor_margin: Template.mayor_margin,

  vice_mayor_name: Template.vice_mayor_name,
  vice_mayor_party: Template.vice_mayor_party,
  vice_mayor_age: Template.vice_mayor_age,
  vice_mayor_gender: Template.vice_mayor_gender,
  vice_mayor_margin: Template.vice_mayor_margin,

  voters_count: Template.voters_count,

  c_mayor_candidate: Template.c_mayor_candidate,
  c_mayor_gender: Template.c_mayor_gender,
  c_mayor_age: Template.c_mayor_age,

  c_vice_mayor_candidate: Template.c_vice_mayor_candidate,
  c_vice_mayor_gender: Template.c_vice_mayor_gender,
  c_vice_mayor_age: Template.c_vice_mayor_age,

  ward_president_candidate: Template.ward_president_candidate,
  ward_president_gender: Template.ward_president_gender,
  ward_president_age: Template.ward_president_age,

};


function getPopupBodyDiv(data) {
  div = "";
  Object.entries(data).forEach(([key, value]) => {
    if (key != "अन्य")
      div += `<div class="row-wrap">
            <div>`+ key + `</div>
            <div>`+ toNepaliDigits(value) + `</div>
          </div>`;
  });
  div += `<div class="row-wrap">
      <div>अन्य</div>
      <div>`+ toNepaliDigits(data["अन्य"]) + `</div>
    </div>`;
  return div;
}

// {
//   "FIELD1": 0,
//   "ID": 1,
//   "lcode": 10105,
//   "district_id": 3,
//   "municipal_id": 317,
//   "province": "प्रदेश १",
//   "district": "ताप्लेजुंग",
//   "municipality": "आठराई त्रिवेणी गाउँपालिका",
//   "position": "अध्यक्ष",
//   "ward": null,
//   "candidate_name": "विश्‍व नाथ सिटौला",
//   "party_nepali_name": "नेपाली काँग्रेस",
//   "Party_code": "NC",
//   "party_id": 2,
//   "gender": "पुरुष",
//   "age": 54,
//   "M": 1,
//   "F": 0,
//   "21-40": 0,
//   "40+": 1,
//   "41-60": 1,
//   "60+": 0
// },