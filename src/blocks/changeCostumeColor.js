(function () {
	return function (num) {


		if(!this.originalPixels || this.name != this.originalName) {
         this.originalPixels = [];
			this.originalName = this.name

		}
		if(!this.originalPixels[this.getCostumeIdx()]) {
			this.originalPixels[this.getCostumeIdx()] = this.costume.contents.getContext('2d')
				.getImageData(0, 0, this.costume.contents.width,
					this.costume.contents.height);
		}
      if(!this.costumeColor[this.getCostumeIdx()]) {
         this.costumeColor[this.getCostumeIdx()] = new Color(0,0,0);
      }

		this.colorChange = true;
		currentPixels = this.costume.contents.getContext('2d')
			.getImageData(0, 0,
				this.costume.contents.width, this.costume.contents.height);
		var hsv = this.costumeColor[this.getCostumeIdx()].hsv();

		hsv[0] = Math.max(Math.min(+num || 0, 100), 0) / 100;
		hsv[1] = 1; // we gotta fix this at some time
		this.costumeColor[this.getCostumeIdx()].set_hsv.apply(this.costumeColor[this.getCostumeIdx()], hsv);

		for(var I = 0, L = this.originalPixels[this.getCostumeIdx()].data.length; I < L; I += 4){
			if(currentPixels.data[I + 3] > 0){
				// If it's not a transparent pixel
				currentPixels.data[I] = this.originalPixels[this.getCostumeIdx()].
					data[I] / 255 * this.costumeColor[this.getCostumeIdx()].r;
				currentPixels.data[I + 1] = this.originalPixels[this.getCostumeIdx()].
					data[I + 1] / 255 * this.costumeColor[this.getCostumeIdx()].g;
				currentPixels.data[I + 2] = this.originalPixels[this.getCostumeIdx()].
					data[I + 2] / 255 * this.costumeColor[this.getCostumeIdx()].b;
			}
		}
		this.costume.contents.getContext('2d')
			.putImageData(currentPixels, 0, 0);
		this.changed();
	};
}());
