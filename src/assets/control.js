export default {
    "236": {
        //城市  车辆等级  S级车辆  M级车辆  信用等级A 信用等级AA  芝麻分  保证金    S级车辆计价规则 M级车辆计价规则
        // S级车辆划线计价规则 M级车辆划线计价规则  操作指南车辆信息
        "city": "青岛236", "Grade": [{car:'S',go:'valuationSList'},{car:'M+',go:'valuationMPList'}],
        'carS':{car:"北汽EV160"},
        'carMP':{car:"大众POLO、丰田VIOS"},
        'creditA':{car:"北汽EV160",grade:'S',cars:[{grades:'S (北汽EV160等)'}]},
        'creditAA':{car:"北汽EV160、大众POLO、丰田VIOS",grade:'S、M+',cars:[{grades:'S (北汽EV160等)'},{grades:'M+ (大众POLO、丰田VIOS等)'}]},
        "zhima":{A:650,AA:680},
        "bail":{A:599,AA:899},
        "priceS": {mileage:"1.00元/公里",LengthT: "0.20元/分钟",minimum:"0元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
        "priceMP": {mileage:"1.20元/公里",LengthT: "0.20元/分钟",minimum:"5.00元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
        "delPriceS": {delMileage:'',delLengthT: "",delMinimum:"5.00元",delAdditional:"",delNodeductibles:""},
        "delPriceMP": {delMileage:"1.38元",delLengthT: "0.38元",delMinimum:"",delAdditional:"",delNodeductibles:""},
        "vehicle":[{"brand":"北汽","name":"EV160"},{"brand":"大众","name":"POLO"},{"brand":"丰田","name":"VIOS"}]
    },
    // "131": {
    //   "city": "北京131", "Grade": [{car:'S',go:'valuationSList'},{car:'M+',go:'valuationMPList'}],
    //   'carS':{car:"北汽EV160"},
    //   'carMP':{car:"大众POLO"},
    //   'creditA':{car:"北汽EV160",grade:'S',cars:[{grades:'S (北汽EV160等)'}]},
    //   'creditAA':{car:"北汽EV160、大众POLO",grade:'S、M+',cars:[{grades:'S (北汽EV160等)'},{grades:'M+ (大众POLO等)'}]},
    //   "zhima":{A:650,AA:680},
    //   "bail":{A:599,AA:899},
    //   "priceS": {mileage:"1.00元/公里",LengthT: "0.20元/分钟",minimum:"0元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
    //   "priceMP": {mileage:"1.20元/公里",LengthT: "0.20元/分钟",minimum:"5.00元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
    //   "delPriceS": {delMileage:'',delLengthT: '',delMinimum:"5.00元",delAdditional:"",delNodeductibles:""},
    //   "delPriceMP": {delMileage:"1.38元",delLengthT: "0.38元",delMinimum:"",delAdditional:"",delNodeductibles:""},
    //   "vehicle":[{"brand":"北汽","name":"EV160"},{"brand":"大众","name":"POLO"}]
    // },
    // "158": {
    //   "city": "长沙158", "Grade": [{car:'S',go:'valuationSList'},{car:'S+',go:'valuationSPList'},{car:'M+',go:'valuationMPList'}],
    //   'carS':{car:"北汽EV160"},
    //   'carSP':{car:"雪佛兰SAIL"},
    //   'carMP':{car:"大众POLO"},
    //   'creditA':{car:"北汽EV160、雪佛兰SAIL",grade:'S、S+',cars:[{grades:'S+ (雪佛兰SAIL等)'}]},
    //   'creditAA':{car:"北汽EV160、雪佛兰SAIL、大众POLO",grade:'S、S+、M+',cars:[{grades:'S(北汽EV160)'},{grades:'S+ (雪佛兰SAIL等)'},{grades:'M+ (大众POLO等)'}]},
    //   "zhima":{A:650,AA:680},
    //   "bail":{A:599,AA:899},
    //   "priceS": {mileage:"1.00元/公里",LengthT: "0.20元/分钟",minimum:"0元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
    //   "priceSP": {mileage:"1.20元/公里",LengthT: "0.20元/分钟",minimum:"5.00元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
    //   "priceMP": {mileage:"1.20元/公里",LengthT: "0.20元/分钟",minimum:"5.00元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
    //   "delPriceS": {delMileage:'',delLengthT: '',delMinimum:"5.00元",delAdditional:"",delNodeductibles:""},
    //   "delPriceSP": {delMileage:'',delLengthT: '',delMinimum:"",delAdditional:"",delNodeductibles:""},
    //   "delPriceMP": {delMileage:"",delLengthT: "0.30元",delMinimum:"",delAdditional:"",delNodeductibles:""},
    //   // "vehicle":[{"brand":"雪佛兰","name":"SAIL"},{"brand":"大众","name":"POLO"}],
    //   "vehicle":[{"brand":"北汽","name":"EV160"},{"brand":"雪佛兰","name":"SAIL"},{"brand":"大众","name":"POLO"}]
    // },
  "default": {
    //城市  车辆等级  S级车辆  M级车辆  信用等级A 信用等级AA  芝麻分  保证金    S级车辆计价规则 M级车辆计价规则
    // S级车辆划线计价规则 M级车辆划线计价规则  操作指南车辆信息
    "city": "默认城市", "Grade": [{car:'S',go:'valuationSList'},{car:'M+',go:'valuationMPList'}],
    'carS':{car:"北汽EV160"},
    'carMP':{car:"大众POLO、丰田VIOS"},
    'creditA':{car:"北汽EV160",grade:'S',cars:[{grades:'S (北汽EV160等)'}]},
    'creditAA':{car:"北汽EV160、大众POLO、丰田VIOS",grade:'S、M+',cars:[{grades:'S (北汽EV160等)'},{grades:'M+ (大众POLO、丰田VIOS等)'}]},
    "zhima":{A:650,AA:680},
    "bail":{A:599,AA:899},
    "priceS": {mileage:"1.00元/公里",LengthT: "0.20元/分钟",minimum:"0元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
    "priceMP": {mileage:"1.20元/公里",LengthT: "0.20元/分钟",minimum:"5.00元",additional:"5.00元/公里",Nodeductibles:"2.00元/单"},
    "delPriceS": {delMileage:'',delLengthT: "",delMinimum:"5.00元",delAdditional:"",delNodeductibles:""},
    "delPriceMP": {delMileage:"1.38元",delLengthT: "0.38元",delMinimum:"",delAdditional:"",delNodeductibles:""},
    "vehicle":[{"brand":"北汽","name":"EV160"},{"brand":"大众","name":"POLO"},{"brand":"丰田","name":"VIOS"}]
  },

}
