(function () {
	return function (num) {
		var hsv = this.costumeColor.hsv();
      
		hsv[1] = 1; 
		hsv[2] = Math.max(Math.min(+num || 0, 100), 0) / 100;
		this.costumeColor.set_hsv.apply(this.costumeColor, hsv);
	};
}());