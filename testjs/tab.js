class Tab{
	constructor(id){
		this.oBox = document.getElementById('box')
		this.aBtn = this.oBox.getElementsByTagName('input')
		this.aDiv = this.oBox.getElementsByTagName('div')
		this.init()
	}

	init(){
		for(let i = 0; i < this.aBtn.length; i++) {
			this.aBtn[i].onclick = () => {
				this.hide();
				this.show(i);
			}
		}
	}

	hide() {
		for(let i=0; i < this.aBtn.length; i++) {
			this.aBtn[i].className = '';
			this.aDiv[i].style.opacity = 0
		}
	}

	show(id) {
		this.aBtn[id].className = 'on';
		this.aDiv[id].style.opacity = 1
	}
}