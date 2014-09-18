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
		this.costumeColor = num;
		this.colorChange = true;
		currentPixels = this.costume.contents.getContext('2d')
			.getImageData(0, 0,
				this.costume.contents.width, this.costume.contents.height);
		var hsv = this.color.hsv();

		hsv[0] = Math.max(Math.min(+num || 0, 100), 0) / 100;
		hsv[1] = 1; // we gotta fix this at some time
		this.color.set_hsv.apply(this.color, hsv);

		for(var I = 0, L = this.originalPixels[this.getCostumeIdx()].data.length; I < L; I += 4){
			if(currentPixels.data[I + 3] > 0){
				// If it's not a transparent pixel
				currentPixels.data[I] = this.originalPixels[this.getCostumeIdx()].
					data[I] / 255 * this.color.r;
				currentPixels.data[I + 1] = this.originalPixels[this.getCostumeIdx()].
					data[I + 1] / 255 * this.color.g;
				currentPixels.data[I + 2] = this.originalPixels[this.getCostumeIdx()].
					data[I + 2] / 255 * this.color.b;
			}
		}
		this.costume.contents.getContext('2d')
			.putImageData(currentPixels, 0, 0);
		this.changed();
	};
}());
