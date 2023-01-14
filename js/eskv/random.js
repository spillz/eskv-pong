function getRandomInt(m1, m2=0) {
    if(m2!=0)
        return m1 + Math.floor(Math.random() * (m2-m1));
    else
        return Math.floor(Math.random() * m1);
  }

function getRandomPos(max1, max2) {
    return [getRandomInt(max1), getRandomInt(max2)];
}

function randomRange(min, max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function shuffle(arr){
    let temp, r;
    for(let i = 1; i < arr.length; i++) {
        r = randomRange(0,i);
        temp = arr[i];
        arr[i] = arr[r];
        arr[r] = temp;
    }
    return arr;
}

function shuffle2(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while(currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function choose(array) {
    return array[Math.floor(Math.random() * array.length)];    
}
