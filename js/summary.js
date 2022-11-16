var Summary = {
    mayor_name: count_mayor_name,
    mayor_party: count_mayor_party,
    mayor_age: count_mayor_age,
    mayor_gender: count_mayor_gender,
    mayor_margin: count_mayor_margin,
   
    vice_mayor_name: count_vice_mayor_name,
    vice_mayor_party: count_vice_mayor_party,
    vice_mayor_age: count_vice_mayor_age,
    vice_mayor_gender: count_vice_mayor_gender,
    vice_mayor_margin: count_vice_mayor_margin,

    voters_count: count_voters_count,

    c_mayor_candidate: count_c_mayor_candidate,
    c_mayor_age: count_c_mayor_age,
    c_mayor_gender: count_c_mayor_gender,

    c_vice_mayor_candidate: count_c_vice_mayor_candidate,
    c_vice_mayor_age: count_c_vice_mayor_age,
    c_vice_mayor_gender: count_c_vice_mayor_gender,

    ward_president_candidate: count_ward_president_candidate,
    ward_president_age: count_ward_president_age,
    ward_president_gender: count_ward_president_gender,


}

var SummaryTitle = {
    candidate: "उम्मेदवारी",
    gender: "महिला उम्मेदवार",
    age: "युवा उम्मेदवार"
}


function regionSummaryFilter(data){
    if(Global.currentPalikaSelect != "All"){
        if(Global.currentPalikaSelect == "Gaunpalika"){
            data = data.filter(function(m){
                var palika = DataLayer.getPalikaFromFid(Data.fidCodeMap.indexOf(m.code));
                
                return palika == "Gaunpalika" || palika == "gaupaika";
            })
        }
        if(Global.currentPalikaSelect == "Nagarpalika"){
            data = data.filter(function(m){
                var palika = DataLayer.getPalikaFromFid(Data.fidCodeMap.indexOf(m.code));
                return palika == "Nagarpalika" || palika == "Mahanagarpalika" || palika == "Upamahanagarpalika" || palika == "maha Nagarpalika";
            })
        }
        
    }
    // if(Global.districtSelected)
    //     return data.filter(function(m){
    //         return m.code.toString().substring(0,3) == Global.districtSelected
    //     });
    // if(Global.provinceSelected)
    //     return data.filter(function(m){
    //         return m.code.toString().substring(0,1) == Global.provinceSelected
    //     });
    else return data;
}

function candidateRegionSummaryFilter(data){
    if(Global.currentPalikaSelect != "All"){
        if(Global.currentPalikaSelect == "Gaunpalika"){
            data = data.filter(function(m){
                var palika = DataLayer.getPalikaFromFid(Data.fidCodeMap.indexOf(m.lcode));
                
                return palika == "Gaunpalika" || palika == "gaupaika";
            })
        }
        if(Global.currentPalikaSelect == "Nagarpalika"){
            data = data.filter(function(m){
                var palika = DataLayer.getPalikaFromFid(Data.fidCodeMap.indexOf(m.lcode));
                return palika == "Nagarpalika" || palika == "Mahanagarpalika" || palika == "Upamahanagarpalika" || palika == "maha Nagarpalika";
            })
        }
        
    }
    if(Global.districtSelected)
        return data.filter(function(m){
            return m.lcode.toString().substring(0,3) == Global.districtSelected
        });
    if(Global.provinceSelected)
        return data.filter(function(m){
            return m.lcode.toString().substring(0,1) == Global.provinceSelected
        });
    else return data;
}

function summaryText(){
    var text ="";
    if(Global.provinceSelected){
        text += ProvinceNepaliName[Global.provinceSelected] +" प्रदेशको ";
    }
    if(Global.districtSelected){
        text += Data.districtNepaliName[Global.districtSelected] +" जिल्लाको ";
    }
    if(Global.currentPalikaSelect != "All"){
        text += $('#palikaSelect').children(':selected').text()+"हरुमा "; 
    }
    text += $('#mayor_select').children(':selected').text() + "पदमा विजयी " + "<b>"+$('#filter_select_1').children(':selected').text() + ": संख्या </b>";

    return text;
}

function votersSummaryText(){
    var text ="";
    if(Global.provinceSelected){
        text += ProvinceNepaliName[Global.provinceSelected] +" प्रदेशको ";
    }
    if(Global.districtSelected){
        text += Data.districtNepaliName[Global.districtSelected] +" जिल्लाको ";
    }
    if(Global.currentPalikaSelect != "All"){
        text += $('#palikaSelect').children(':selected').text()+"हरुमा "; 
    }
    text += "मतदाता दर्ता: संख्या </b>";

    return text;
}

function candidateSummaryText(){
    var text ="";
    if(Global.provinceSelected){
        text += ProvinceNepaliName[Global.provinceSelected] +" प्रदेशको ";
    }
    if(Global.districtSelected){
        text += Data.districtNepaliName[Global.districtSelected] +" जिल्लाको ";
    }
    if(Global.currentPalikaSelect != "All"){
        text += $('#palikaSelect').children(':selected').text()+"हरुमा "; 
    }
    text += $('#c_mayor_select').children(':selected').text() + "पदमा " + "<b>"+ SummaryTitle[$('#c_filter_select_1').children(':selected').val()] + ": संख्या </b>";

    return text;
}

function count_mayor_name(){
    
}

function count_mayor_gender(key){
    data = regionSummaryFilter(Data.Mayors);
    return toNepaliDigits(data.filter(function(m){
        return m.gender1 == key
    }).length);
}

function s_title_mayor_gender(){
    var title = "";
}

function count_mayor_age(key){
    data = regionSummaryFilter(Data.Mayors);
    if(key == "21-40" ){
        return toNepaliDigits(data.filter(function(m){
            return m.age1 >=21 && m.age1<=40;
        }).length);
    }
    else if(key == "41-60"){
        return toNepaliDigits(data.filter(function(m){
            return m.age1 >=41 && m.age1<=60;
        }).length);
    }
    else if(key == "60+" ){
        return toNepaliDigits(data.filter(function(m){
            return m.age1 > 60;
        }).length);
    }
    else{
        return toNepaliDigits(0);
    }
}

function count_mayor_margin(key){
    data = regionSummaryFilter(Data.Mayors);
    if(key == "० - १००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2) <= 100;
        }).length);
    }
    else if(key == "१०१ - ३००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>100 && (m.acquired_vote1 - m.acquired_vote2) <= 300;
        }).length);
    }
    else if(key == "३०१ - १,०००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>300 && (m.acquired_vote1 - m.acquired_vote2) <= 1000;
        }).length);
    }
    else if(key == "१,००१ - ३,०००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>1000 && (m.acquired_vote1 - m.acquired_vote2) <= 3000;
        }).length);
    }
    else if(key == "३,००० माथी"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>3000;
        }).length);
    }
    else{
        return toNepaliDigits(0);
    }
}

function count_mayor_party(key){
    data = regionSummaryFilter(Data.Mayors);
    if(key != "others")
        return toNepaliDigits(data.filter(function(m){
            return m.partycode1 == key
        }).length);
    else{
        var otherparties =  Object.keys(Data.Parties).filter(function(m){
            return Data.Parties[m].color_code == "#D4E2F8"
        });

        return toNepaliDigits(data.filter(function(n){
            return otherparties.includes(n.partycode1)
        }).length);
    }
}
function count_vice_mayor_name(){
    
}

function count_vice_mayor_party(key){
    data = regionSummaryFilter(Data.ViceMayors);
    if(key != "others")
        return toNepaliDigits(data.filter(function(m){
            return m.partycode1 == key
        }).length);
    else{
        var otherparties = Data.Parties.filter(function(m){
            return m.color_code == "#D4E2F8"
        }).map(function(m){
            return m.party_code;
        });
        return toNepaliDigits(data.filter(function(n){
            return otherparties.includes(n.partycode1)
        }).length);
    }
}

function count_vice_mayor_gender(key){
    data = regionSummaryFilter(Data.ViceMayors);
    return toNepaliDigits(data.filter(function(m){
        return m.gender1 == key
    }).length);
}

function count_vice_mayor_age(key){
    data = regionSummaryFilter(Data.ViceMayors);
    if(key == "21-40" ){
        return toNepaliDigits(data.filter(function(m){
            return m.age1 >=21 && m.age1<=40;
        }).length);
    }
    else if(key == "41-60"){
        return toNepaliDigits(data.filter(function(m){
            return m.age1 >=41 && m.age1<=60;
        }).length);
    }
    else if(key == "60+" ){
        return toNepaliDigits(data.filter(function(m){
            return m.age1 > 60;
        }).length);
    }
    else{
        return toNepaliDigits(0);
    }
}


function count_vice_mayor_margin(key){
    data = regionSummaryFilter(Data.ViceMayors);
    if(key == "० - १००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2) <= 100;
        }).length);
    }
    else if(key == "१०१ - ३००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>100 && (m.acquired_vote1 - m.acquired_vote2) <= 300;
        }).length);
    }
    else if(key == "३०१ - १,०००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>300 && (m.acquired_vote1 - m.acquired_vote2) <= 1000;
        }).length);
    }
    else if(key == "१,००१ - ३,०००"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>1000 && (m.acquired_vote1 - m.acquired_vote2) <= 3000;
        }).length);
    }
    else if(key == "३,००० माथी"){
        return toNepaliDigits(data.filter(function(m){
            return (m.acquired_vote1 - m.acquired_vote2)>3000;
        }).length);
    }
    else{
        return toNepaliDigits(0);
    }
}

function count_c_mayor_candidate(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    data.map(function(m){
        if(m.position == "अध्यक्ष" || m.position == "प्रमुख"){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
    })
    if(key == "० - ५"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value >= 0 && value <=5){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "६ - १०"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value > 5 && value <= 10){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value > 10){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_c_mayor_age(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    var totalCountMap = {}

    data.map(function(m){
        if(!countMap[m.lcode])
            countMap[m.lcode] = 0
        if(!totalCountMap[m.lcode])
            totalCountMap[m.lcode] = 0
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख") && m['21-40']){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख")){
            if(countMap[m.lcode])
                totalCountMap[m.lcode]  += 1
            else
                totalCountMap[m.lcode] = 1 
        }
    })
    if(key == "०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( value  == 0 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "० - २०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 0 && (value / totalCountMap[key]) <= 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "२० - ५०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 20 && (value / totalCountMap[key]) <= 50){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "५० - ८०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 50 && (value / totalCountMap[key]) <= 80){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 80 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_c_mayor_gender(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    var totalCountMap = {}

    data.map(function(m){
        if(!countMap[m.lcode])
            countMap[m.lcode] = 0
        if(!totalCountMap[m.lcode])
            totalCountMap[m.lcode] = 0
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख") && m.F){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख")){
            if(countMap[m.lcode])
                totalCountMap[m.lcode]  += 1
            else
                totalCountMap[m.lcode] = 1 
        }
    })
    if(key == "०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( value == 0 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "० - २०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 0 && (value / totalCountMap[key]) <= 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "२० - ५०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 20 && (value / totalCountMap[key]) <= 50){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "५० - ८०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 50 && (value / totalCountMap[key]) <= 80){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 80 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_c_vice_mayor_candidate(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    data.map(function(m){
        if(m.position == "उपाध्यक्ष" || m.position == "उपप्रमुख"){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
    })
    if(key == "० - ५"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value >= 0 && value <=5){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "६ - १०"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value > 5 && value <= 10){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value > 10){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_c_vice_mayor_age(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    var totalCountMap = {}

    data.map(function(m){
        if(!countMap[m.lcode])
            countMap[m.lcode] = 0
        if(!totalCountMap[m.lcode])
            totalCountMap[m.lcode] = 0
        if((m.position == "उपाध्यक्ष" || m.position == "उपप्रमुख") && m['21-40']){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
        if((m.position == "उपाध्यक्ष" || m.position == "उपप्रमुख")){
            if(countMap[m.lcode])
                totalCountMap[m.lcode]  += 1
            else
                totalCountMap[m.lcode] = 1 
        }
    })
    if(key == "०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( value  == 0 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "० - २०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 0 && (value / totalCountMap[key]) <= 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "२० - ५०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 20 && (value / totalCountMap[key]) <= 50){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "५० - ८०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 50 && (value / totalCountMap[key]) <= 80){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 80 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_c_vice_mayor_gender(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    var totalCountMap = {}

    data.map(function(m){
        if(!countMap[m.lcode])
            countMap[m.lcode] = 0
        if(!totalCountMap[m.lcode])
            totalCountMap[m.lcode] = 0
        if((m.position == "उपाध्यक्ष" || m.position == "उपप्रमुख") && m.F){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
        if((m.position == "उपाध्यक्ष" || m.position == "उपप्रमुख")){
            if(countMap[m.lcode])
                totalCountMap[m.lcode]  += 1
            else
                totalCountMap[m.lcode] = 1 
        }
    })
    if(key == "०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( value  == 0 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "० - २०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 0 && (value / totalCountMap[key]) <= 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "२० - ५०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 20 && (value / totalCountMap[key]) <= 50){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "५० - ८०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 50 && (value / totalCountMap[key]) <= 80){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 80 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_ward_president_candidate(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    data.map(function(m){
        if(m.position == "वडा अध्यक्ष"){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
    })
    if(key == "० - १०"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value >= 0 && value <= 10){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "११ - २०"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value > 10 && value <= 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if(value > 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_ward_president_age(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    var totalCountMap = {}

    data.map(function(m){
        if(!countMap[m.lcode])
            countMap[m.lcode] = 0
        if(!totalCountMap[m.lcode])
            totalCountMap[m.lcode] = 0
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख") && m['21-40']){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख")){
            if(countMap[m.lcode])
                totalCountMap[m.lcode]  += 1
            else
                totalCountMap[m.lcode] = 1 
        }
    })
    if(key == "०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( value  == 0 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "० - २०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 0 && (value / totalCountMap[key]) <= 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "२० - ५०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 20 && (value / totalCountMap[key]) <= 50){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "५० - ८०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 50 && (value / totalCountMap[key]) <= 80){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 80 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_ward_president_gender(key){
    data = candidateRegionSummaryFilter(Data.Candidates);
    var countMap = {}
    var totalCountMap = {}

    data.map(function(m){
        if(!countMap[m.lcode])
            countMap[m.lcode] = 0
        if(!totalCountMap[m.lcode])
            totalCountMap[m.lcode] = 0
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख") && m.F){
            if(countMap[m.lcode])
                countMap[m.lcode]  += 1
            else
                countMap[m.lcode] = 1 
        }
        if((m.position == "अध्यक्ष" || m.position == "प्रमुख")){
            if(countMap[m.lcode])
                totalCountMap[m.lcode]  += 1
            else
                totalCountMap[m.lcode] = 1 
        }
    })
    if(key == "०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( value  == 0 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "० - २०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 0 && (value / totalCountMap[key]) <= 20){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "२० - ५०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 20 && (value / totalCountMap[key]) <= 50){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else if(key == "५० - ८०%"){
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 50 && (value / totalCountMap[key]) <= 80){
                count++;
            }
        })
        return toNepaliDigits(count);
    }
    else {
        var count = 0;
        Object.entries(countMap).forEach(([key, value]) => {
            if( (value / totalCountMap[key]) * 100.00 > 80 ){
                count++;
            }
        })
        return toNepaliDigits(count);
    }

}

function count_voters_count(){
    var data = regionSummaryFilter(Data.registeredVoters);
    var count = 0;
    data.forEach(function(d){
        count+= parseInt(d["2079_total"].replace(",",""));
    })
    return toNepaliDigits(count);

}