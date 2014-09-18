(function () {
	return function (num) {
      if(!this.costumeColor[this.getCostumeIdx()]) {
         this.costumeColor[this.getCostumeIdx()] = new Color(0,0,0);
      }
		var hsv = this.costumeColor[this.getCostumeIdx()].hsv();
      
		hsv[1] = 1; 
		hsv[2] = Math.max(Math.min(+num || 0, 100), 0) / 100;
		this.costumeColor[this.getCostumeIdx()].set_hsv.apply(this.costumeColor[this.getCostumeIdx()], hsv);
	};
}());