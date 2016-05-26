function getMessage(a, b) {

  if (typeof(a) === 'boolean') {
    if(a) {
      return 'Я попал в ' + b;
    }
      else {
          return 'Я никуда не попал';
      }
  }

  if (typeof(a) === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    var length = 0;
    var s;
    for (s = 0; s < a.length; s++) {
    length += a[s] + b[s];
    }
    return 'Я прошёл ' + length + ' метров';
  }

  if (Array.isArray(a)) {
    var sum = 0;
    var i;
    for (i = 0; i < a.length; i++) {
    sum += a[i];
    }
    return 'Я прошёл ' + sum + ' шагов';
  }
}
