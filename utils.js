exports.merge_union = (results, vs, ve) => {
  var time_results = [];
  var not_inserted = true;
  results.forEach(element => {
    if((element.vs <= ve) && (vs <= element.vs) && (ve <= element.ve)) {
      time_results.push({"vs":vs, "ve":element.ve});
      not_inserted = false;
    }else if((element.ve >= vs) && (element.vs <= vs) && (ve >= element.ve)) {
      time_results.push({"vs":element.vs, "ve":ve});
      not_inserted = false;
    }else if((element.vs <= vs) && (element.ve >= ve)){
      time_results.push({"vs":element.vs, "ve":element.ve})
      not_inserted = false;
    }else if((element.vs >= ve) && (element.ve <= vs)) {
      time_results.push({"vs":vs, "ve":ve})
      not_inserted = false;
    }else {
      time_results.push({"vs":element.vs, "ve":element.ve});
    }
  });
  if (not_inserted) {
    time_results.push({"vs":vs, "ve":ve});
  }
  console.log(time_results);
  return time_results;
}

exports.merge_substract = (results, vs, ve) => {
  var time_results = [];
  results.forEach(element => {
    if((element.vs==vs)&&(element.ve==ve)) {
      //insert nothing
    }else if((element.vs <= ve) && (vs <= element.vs) && (ve <= element.ve)) {
      time_results.push({"vs":ve, "ve":element.ve});
    }else if((element.ve >= vs) && (element.vs <= vs) && (ve >= element.ve)) {
      time_results.push({"vs":element.vs, "ve":vs});
    }else if((element.vs < vs) && (element.ve > ve)){
      time_results.push({"vs":element.vs, "ve":vs});
      time_results.push({"vs":ve, "ve":element.ve});
    }else if((element.ve <= vs) || (element.vs >= ve)){
      time_results.push({"vs":element.vs, "ve":element.ve});
    }
  });
  console.log(time_results);
  return time_results;
}
