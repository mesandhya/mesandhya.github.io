var Data = {
    PhotoLinkPage: [],
    Parties: [],
    PartiesById: [],
    Mayors: [],
    ViceMayors: [],
    fidCodeMap: [],
    fidCodeDistrict: [],
    districtNepaliName: [],
    registeredVoters: [],
    Candidates: [],
    Districts: [],
    Municipalities: [],
    ConstituencyNames : [],
    DistrictNames: [],
}

var GeneralProvienceColor = {
    "1": "#88b7ff",
    "2": "#ccd7d9",
    "3": "#c7dbff",
    "4": "#75b6ef",
    "5": "#b0e0e9",
    "6": "#c6d9ff",
    "7": "#97c5e7"
}

var ProvinceNepaliName = {
    "1": "प्रदेश नं. १",
    "2": "मधेश",
    "3": "बागमती",
    "4": "गण्डकी",
    "5": "लुम्बिनी",
    "6": "कर्णाली",
    "7": "सुदूरपश्चिम"
}

var GenderColor = {
    "M":"#2CD9FF",
    "F":"#e064a7"
}

var AgeBracketColor = {
    "21-40" : "#edf8b1",
    "41-60" : "#7fcdbb",
    "60+" :  "#2c7fb8"
}
var NationalParks = {
    // '72'	:	'कोशी टप्पु वन्यजन्तु आरक्ष',
    // '139'	:	'कोशी टप्पु वन्यजन्तु आरक्ष',
    // '158'	:	'कोशी टप्पु वन्यजन्तु आरक्ष',
    '313'	:	'शिवपुरी जलाधार र वन्यजन्तु आरक्ष',
    '314'	:	'लाङटाङ राष्ट्रिय निकुञ्ज',
    '343'	:	'पर्सा वन्यजन्तु आरक्ष',
    '344'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '379'	:	'पर्सा वन्यजन्तु आरक्ष',
    '394'	:	'पर्सा वन्यजन्तु आरक्ष',
    '395'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '403'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '464'	:	'ढोरपाटन शिकार आरक्ष',
    '482'	:	'ढोरपाटन शिकार आरक्ष',
    '528'	:	'लुम्बिनी सांस्कृतिक विकास क्षेत्र',
    '607'	:	'बर्दिया राष्ट्रिय निकुञ्ज',
    '680'	:	'खप्तड राष्ट्रिय निकुञ्ज',
    '693'	:	'खप्तड राष्ट्रिय निकुञ्ज',
    '704'	:	'खप्तड राष्ट्रिय निकुञ्ज',
    '714'	:'खप्तड राष्ट्रिय निकुञ्ज',
    '737'	:	'शुक्लाफाँटा राष्ट्रिय निकुञ्ज',
    '773'	:	'चितवन राष्ट्रिय निकुञ्ज',
    '777'	:	'ढोरपाटन शिकार आरक्ष',
    
}

var NationalParksProvince = {
    '72':	'1',
	'139':	'1',
	'158':	'2',
	'313':	'3',
	'314':	'3',
	'343':	'3',
	'344':	'3',
	'379':	'2',
	'394':	'2',
	'395':	'2',
	'403':	'3',
	'464':	'4',
	'482':	'4',
	'528':	'5',
	'607':	'5',
	'680':	'7',
	'693':	'7',
	'704':	'7',
	'714':	'7',
	'737':	'7',
	'773':	'4',
	'777':	'5',
}

var NationalParksDistrict = {
    '72':	'113',	
	'139':	'114',
	'158':	'201',
	'313':	'305',	
	'314':	'305',	
	'343':	'312',	
	'344':	'312',
	'379':	'207',	
	'394':	'208',
	'395':	'208',
	'403':	'313',
	'464':	'404',	
	'482':	'411',	
	'528':	'508',	
	'607':	'512',
	'680':	'701',
	'693':	'702',	
	'704':	'707',
	'714':	'706',
	'737':	'709',
	'773':	'408',
	'777':	'501',
}


var MarginColors = {
    "० - १००":"#eff3ff",
    "१०१ - ३००":"#c6dbef",
    "३०१ - १,०००":"#9ecae1",
    "१,००१ - ३,०००":"#6baed6",
    "३,००० माथी":"#3182bd",
}

var GeoJsons = {
    "province":null,
    "municipality":null,
    "district":null
}

var VoterCountColors = {
    "० - १,०००":"#eff3ff",
    "१,००१ - १०,०००":"#c6dbef",
    "१,०००१ - २०,०००":"#9ecae1",
    "२०,००१ - ३०,०००":"#6baed6",
    "३०,००१ - १००,०००":"#3182bd",
    "१००,००० माथी":"#08519c",
}

var CandidateColors = {
    "० - ५": "#d5f6ff",
    "६ - १०": "#72d0ea",
    "१० माथी": "#1198e1",
}

var WardCandidateColors = {
    "० - १०": "#d5f6ff",
    "११ - २०": "#72d0ea",
    "२० माथी": "#1198e1",
}

var GenderCandidateColors = {
    "०%": "#30bede",
    "० - २०%": "#84dff4",
    "२० - ५०%": "#feebe2",
    "५० - ८०%": "#fbb4b9",
    "८०% माथी": "#c51b8a",
}

var AgeCandidateColors = {
    "०%": "#32c4a6",
    "० - २०%": "#8ae3d0",
    "२० - ५०%": "#ffffd4",
    "५० - ८०%": "#fed98e",
    "८०% माथी": "#fe9929",
}

function getMarginColor(m){
    if(m<=100)
        return MarginColors["० - १००"];
    else if( m>100 && m <= 300 )
        return MarginColors["१०१ - ३००"];
    else if( m>300 && m <= 1000 )
        return MarginColors["३०१ - १,०००"];
    else if( m>1000 && m <= 3000 )
        return MarginColors["१,००१ - ३,०००"];
    else
        return MarginColors["३,००० माथी"];
}


function candidateColor(m){
    if( m <= 5 )
        return CandidateColors["० - ५"];
    else if( m > 5 && m <= 10 )
        return CandidateColors["६ - १०"];
    else
        return CandidateColors["१० माथी"];
}

function wardCandidateColor(m){
    if( m <= 10 )
        return WardCandidateColors["० - १०"];
    else if( m > 10 && m <= 20 )
        return WardCandidateColors["११ - २०"];
    else
        return WardCandidateColors["२० माथी"];
}

function genderCandidateColor(m){
    if( m == 0 )
        return GenderCandidateColors["०%"];
    else if( m > 0 && m <= 20 )
        return GenderCandidateColors["० - २०%"];
    else if( m >20 && m <= 50 )
        return GenderCandidateColors["२० - ५०%"];
    else if( m > 50 && m <= 80 )
        return GenderCandidateColors["५० - ८०%"];
    else
        return GenderCandidateColors["८०% माथी"];
}

function ageCandidateColor(m){
    if( m == 0 )
        return AgeCandidateColors["०%"];
    else if( m > 0 && m <= 20 )
        return AgeCandidateColors["० - २०%"];
    else if( m >20 && m <= 50 )
        return AgeCandidateColors["२० - ५०%"];
    else if( m > 50 && m <= 80 )
        return AgeCandidateColors["५० - ८०%"];
    else
        return AgeCandidateColors["८०% माथी"];
}


function voterColor(c){
    if( c <1000)
        return VoterCountColors["० - १,०००"]
    else if (c > 1000 && c<=10000)
        return VoterCountColors["१,००१ - १०,०००"]
    else if (c > 10000 && c<=20000)
        return VoterCountColors["१,०००१ - २०,०००"]
    else if (c > 20000 && c<=30000)
        return VoterCountColors["२०,००१ - ३०,०००"]
    else if (c > 30000 && c<=100000)
        return VoterCountColors["३०,००१ - १००,०००"]
    else
        return VoterCountColors["१००,००० माथी"]
}

var provincePopulation = [
    [1, 4972021,190],
    [2, 6126288,630],
    [3, 6084042,300],
    [4, 2479745,120],
    [5, 5124225,230],
    [6, 1694889,61],
    [7, 2711270,140]
  ];

class DataLayerClass{

    getMayorNameColor(OBJECTID_1){
        if(!Data.fidCodeMap[OBJECTID_1])
            return "#220000";
        var mayor = Data.Mayors[Data.fidCodeMap[OBJECTID_1]];
        if(!mayor){
            return "#fff";
        }
        if(!Data.PartiesById[mayor['2074PartyID']]){
            return "#2385aa";
        }
        return Data.PartiesById[mayor['2074PartyID']].color_code;
    }

    getMayorGenderColor(OBJECTID_1){
        var mayor = Data.Mayors[Data.fidCodeMap[OBJECTID_1]];
        if(!mayor)
            return "#fff";
        if(!Data.PartiesById[mayor['2074PartyID']]){
            return "#2385aa";
        }
        return GenderColor[mayor["2074Gender"]];
    }

    getMayorAgeColor(OBJECTID_1){
        var mayor = Data.Mayors[Data.fidCodeMap[OBJECTID_1]];
        if(!mayor)
            return "#fff";
        if(!Data.PartiesById[mayor['2074PartyID']]){
            return "#2385aa";
        }
        return AgeBracketColor[mayor["2074AgeBracket"]];
    }

    getMayorMarginColor(OBJECTID_1){
        var mayor = Data.Mayors[Data.fidCodeMap[OBJECTID_1]];
        if(!mayor)
            return "#fff";
        if(!Data.PartiesById[mayor['2074PartyID']]){
                return "#2385aa";
            }
        return getMarginColor(mayor["1stTotalVoteReceived"] - mayor["2ndTotalVoteReceived"]);
    }

    getMayorInfo(OBJECTID_1){
        // console.log(OBJECTID_1);
        // console.log(Data.fidCodeMap[OBJECTID_1]);

        return Data.Mayors[Data.fidCodeMap[OBJECTID_1]];
    }

    getViceMayorNameColor(OBJECTID_1){
        if(!Data.fidCodeMap[OBJECTID_1])
            return "#220000";
        var vicemayor = Data.ViceMayors[Data.fidCodeMap[OBJECTID_1]];
        if(!vicemayor)
            return "#fff";
        return Data.Parties[vicemayor.partycode1].color_code;
    }

    getViceMayorGenderColor(OBJECTID_1){
        var mayor = Data.ViceMayors[Data.fidCodeMap[OBJECTID_1]];
        if(!mayor)
            return "#fff";
        return GenderColor[mayor.gender1];
    }

    getViceMayorAgeColor(OBJECTID_1){
        var mayor = Data.ViceMayors[Data.fidCodeMap[OBJECTID_1]];
        if(!mayor)
            return "#fff";
        return AgeBracketColor[mayor.age_bracket1];
    }

    getViceMayorMarginColor(OBJECTID_1){
        var mayor = Data.ViceMayors[Data.fidCodeMap[OBJECTID_1]];
        if(!mayor)
            return "#fff";
        return getMarginColor(mayor.acquired_vote1 - mayor.acquired_vote2);
    }
    

    getViceMayorInfo(OBJECTID_1){

        // console.log(OBJECTID_1);
        // console.log(Data.fidCodeMap[OBJECTID_1]);

        return Data.ViceMayors[Data.fidCodeMap[OBJECTID_1]];
    }

    getVoterCountColor(OBJECTID_1){
        if(!Data.registeredVoters[Data.fidCodeMap[OBJECTID_1]])
            return "#e2f7e1";
        var count = parseInt(Data.registeredVoters[Data.fidCodeMap[OBJECTID_1]]["2079_total"].replace(',',""));
        return voterColor(count);
    }
    
    getRegisteredVotersInfo(OBJECTID_1){
        // console.log(OBJECTID_1);
        return Data.registeredVoters[Data.fidCodeMap[OBJECTID_1]];
    }

    getMayorCandidateInfo(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var candidates = {}
        candidates["अन्य"] = 0;
        Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख")
        }).forEach(function(c){
            if(!Data.Parties[c.Party_code]){
                console.log(c);
            }
            if(Data.Parties[c.Party_code].color_code == "#D4E2F8")
                candidates["अन्य"] += 1;
            else
                candidates[Data.Parties[c.Party_code].party_nepali_name] = c.candidate_name
        });
        return candidates;
    }

    getMayorCandidateGenderCount(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var info = {};
        info["total"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख")
        }).length;
        info["count"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख") && c.F==1
        }).length;
        return info;
    }

    getMayorCandidateAgeCount(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var info = {};
        info["total"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख")
        }).length;
        info["count"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख") && c['21-40']==1
        }).length;
        return info;
    }

    getMayorCandidateColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख")
        }).length;
        // console.log(Data.Candidates);
        return candidateColor(count);
    }

    getMayorCandidateGenderColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख") && c.F == 1
        }).length;
        var total = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख")
        }).length;
        return genderCandidateColor((count/total)*100);
    }

    getMayorCandidateAgeColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख") && c["21-40"] == 1
        }).length;
        var total = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "अध्यक्ष" || c.position == "प्रमुख")
        }).length;
        return ageCandidateColor((count/total)*100);
    }

    getViceMayorCandidateInfo(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var candidates = {}
        candidates["अन्य"] = 0;
        Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख")
        }).forEach(function(c){

            if(Data.Parties[c.Party_code].color_code == "#D4E2F8")
                candidates["अन्य"] += 1;
            else
                candidates[Data.Parties[c.Party_code].party_nepali_name] = c.candidate_name
        });
        return candidates;
    }

    getViceMayorCandidateGenderCount(OBJECTID_1){
        var info = {};
        var lcode = Data.fidCodeMap[OBJECTID_1];

        info["total"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख")
        }).length;
        info["count"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख") && c.F==1
        }).length;
        return info;

    }

    getViceMayorCandidateAgeCount(OBJECTID_1){
        var info = {};
        var lcode = Data.fidCodeMap[OBJECTID_1];

        info["total"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख")
        }).length;
        info["count"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख") && c["21-40"]==1
        }).length;
        return info;

    }

    getViceMayorCandidateColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख") 
        }).length;
        return candidateColor(count);
    }

    getViceMayorCandidateGenderColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख") && c.F == 1
        }).length;

        var total = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख") 
        }).length;
        return genderCandidateColor((count/total)*100);
    }

    getViceMayorCandidateAgeColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख") && c["21-40"] == 1
        }).length;
        var total = Data.Candidates.filter(function(c){
            return c.lcode == lcode && (c.position == "उपाध्यक्ष" || c.position == "उपप्रमुख") 
        }).length;
        return ageCandidateColor((count/total)*100);
    }

    getWardPresidentCandidateInfo(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var candidates = {}
        candidates["अन्य"] = 0;
        Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" ;
        }).forEach(function(c){
            if(Data.Parties[c.Party_code].color_code == "#D4E2F8")
                candidates["अन्य"] += 1;
            else{
                if(candidates[Data.Parties[c.Party_code].party_nepali_name])
                    candidates[Data.Parties[c.Party_code].party_nepali_name] += 1;
                else
                    candidates[Data.Parties[c.Party_code].party_nepali_name] = 1
            }
            
        });
        return candidates;
    }

    getWardPresidentCandidateGenderCount(OBJECTID_1){
        var info = {};
        var lcode = Data.fidCodeMap[OBJECTID_1];
        info["total"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष"
        }).length;
        info["count"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" && c.F==1
        }).length;
        return info;

    }

    getWardPresidentCandidateAgeCount(OBJECTID_1){
        var info = {};
        var lcode = Data.fidCodeMap[OBJECTID_1];
        info["total"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष"
        }).length;
        info["count"] = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" && c['21-40']==1
        }).length;
        return info;

    }

    getWardPresidentCandidateColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" ;
        }).length;
       
        return wardCandidateColor(count);
    }

    getWardPresidentCandidateGenderColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" && c.F == 1;
        }).length;
        var total = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" ;
        }).length;
        return genderCandidateColor((count/total)*100);
    }

    getWardPresidentCandidateAgeColor(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var count = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" && c["21-40"] == 1;
        }).length;
        var total = Data.Candidates.filter(function(c){
            return c.lcode == lcode && c.position == "वडा अध्यक्ष" ;
        }).length;
        return ageCandidateColor((count/total)*100);
    }


    getCandidateHeader(OBJECTID_1){
        var lcode = Data.fidCodeMap[OBJECTID_1];
        var d = Data.Candidates.filter(function(c){
            return c.lcode == lcode;
        });
        if(d.length > 0){
            return d[0];
        }
        return "";

    }
    

    getPalikaFromFid(fid){
        var m = GeoJsons.municipality.features.filter(function(feature){
            return feature.properties.OBJECTID_1 == fid
        });
        if(m.length){
            return m[0].properties.Type_GN
        }
        return "";
    }
};

var DataLayer = new DataLayerClass();