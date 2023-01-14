const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function arrEq(array1, array2) {
    return array1.length == array2.length && array1.every((value, index) => value == array2[index])
}

function rads(degrees) {
    return degrees*Math.PI/180
}

function dist(pos1, pos2) {
    return new Vec2(pos1).dist(pos2);
}

function adist(pos1, pos2) { //TODO: Rename this to disambiguate from regular distance measure
	var dx = Math.abs(pos1 [0] - pos2 [0]);
	var dy = Math.abs(pos1 [1] - pos2 [1]);
	return Math.max(dx, dy) + 0.5 * Math.min(dx, dy);
}

class MathArray extends Array {
    constructor(...arr) {
        if(arr.length==1 && arr[0] instanceof Array) {
            super(...arr[0]);
        } else {
            super(...arr);
        }
    }
    sum() {
        let s=0;
        this.forEach(el => s+=el);
        return s;
    }
    mean() {
        return this.sum()/this.length;
    }
    max() {
        return Math.max.apply(null, this);
    }
    min() {
        return Math.min.apply(null, this);
    }
    vars() { //sample variance
        let s=0;
        this.forEach(el => s+=el*el);
        return(s - this.length*this.mean()^2)/(this.length-1);
    }
    var() { //population variance
        let s=0;
        this.forEach(el => s+=el*el);
        return s/this.length - this.mean()^2;
    }
    std() { //population standard deviation
        return Math.sqrt(this.var());
    }
    add(arr2) {
        let a = new MathArray(this);
        if(arr2 instanceof Array || arr2 instanceof MathArray) {
            for(let i=0;i<this.length;i++) {
                a[i] += arr2[i];
            }
        } else {
            for(let i=0;i<this.length;i++) {
                a[i]+=arr2;
            }
        }
        return a;
    }
    mul(arr2) {
        let a = new MathArray(this);
        if(arr2 instanceof Array || arr2 instanceof MathArray) {
            for(let i=0;i<this.length;i++) {
                a[i] *= arr2[i];
            }
        } else {
            for(let i=0;i<this.length;i++) {
                a[i]*=arr2;
            }
        }
        return a;
    }
    dot(arr2) {
        return this.mul(arr2).sum();
    }
    abs() {
        return Math.abs.apply(null, this);
    }
    shift(k) { //lag operator
        let a = new MathArray();
        for(let i=-k;i<this.length-k;i++) {
            if(i<0 || i>=this.length) {
                a.push(NaN);
            } else {
                a.push(this[i]);
            }
        }
        return a;
    }
    filter(func) {
        return new MathArray(super.filter(func));
    }
    dropNaN() {
        return this.filter(el => el!=NaN);
    }
}
