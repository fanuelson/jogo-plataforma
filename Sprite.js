			function Sprite(){
				this.x = 130;
				this.y = 130;
				this.vx = 0;
				this.vy = 0;
				this.ax = 0;
				this.ay = 0;
				this.w = 30;
				this.h = 30;
				this.velocidade = 0;
				this.angulo = -Math.PI/2;
				this.va = 0;
				this.atx = 1.5;
				this.aty = 0;

				this.moverAng = function(dt, g){
					this.angulo = this.angulo + this.va*dt;
					this.vx = Math.cos(this.angulo)*this.velocidade;
					this.vy = Math.sin(this.angulo)*this.velocidade;
					this.x = this.x + this.vx*dt;
					
					this.y = this.y + this.vy*dt;
				};
				this.moverCart = function(dt, g){
					this.ax -= this.atx*(this.vx);
					this.ay -= this.aty*(this.vy);

					this.vx = this.vx + this.ax*dt;					
					this.vy = this.vy + this.ay*dt + g*dt;

					this.x = this.x + this.vx*dt;
					this.y = this.y + this.vy*dt;
				};
				this.moverCartGrid = function(dt, g, grid){
					this.ax -= this.atx*(this.vx);
					this.ay -= this.aty*(this.vy);

					this.vx = this.vx + this.ax*dt;					
					this.vy = this.vy + this.ay*dt + g*dt;

					this.gx = Math.floor(this.x/30);
					this.gy = Math.floor((this.y+14)/30);

					this.x = this.x + this.vx*dt;
					if(grid[this.gy+1][this.gx]==1){
						var dy = Math.min(
							this.vy*dt,
							(this.gy+1)*30-(this.y+this.h/2)
						);
						if(dy ==0) this.vy = 0;
						this.y += dy;

					} else {
						this.y = this.y + this.vy*dt;
					}
					if(this.x<this.w/2) this.x = this.w/2;	
					if(this.y<this.h/2) this.y = this.h/2;
					if(this.x+this.w/2>30*20) this.x = 30*20-this.w/2;	
					if(this.y+this.h/2>30*20) this.y = 30*20-this.h/2;
				};
				this.desenhar = function(ctx){
					ctx.save();

					ctx.strokeStyle = "black";
					ctx.fillStyle = "rgb(250, 150, 150)";

					ctx.translate(this.x, this.y);
					ctx.rotate(this.angulo+Math.PI/2);
					ctx.beginPath();
					ctx.moveTo(-this.w/2, this.h/2);
					ctx.lineTo(this.w/2, this.h/2);
					ctx.lineTo(0, -this.h/2);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.restore();
					ctx.strokeStyle = "white";
					ctx.strokeRect(this.gx*30,this.gy*30, 30, 30);
				};
				this.controlar = function(){

				};
				this.colidiuCom = function(alvo){
					if(this.x > alvo.x+alvo.w) return false;
					if(this.x+this.w < alvo.x) return false;
					if(this.y > alvo.y+alvo.h) return false;
					if(this.y+this.h < alvo.y) return false;
					return true;
				};
			}
