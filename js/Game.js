class Game {
  constructor() {}

  getState(){
var gameStateRef=database.ref("gameState")
gameStateRef.on("value",function(data){
  gameState=data.val()
})
    //defina as funções da classe


}

  

  update(state){
   database.ref("/").update({
     gameState:state
   })
    //defina as funções da classe

  }

  start() {
    
    // crie uma instância de novo jogador
   player=new Player()
    // inicie a variável playerCount
    playerCount=player.getCount()

    form = new Form();
    form.display();

    car1 = createSprite (width/2 - 50, height - 100);
    car1.addImage("car1",car1_img);
    car1.scale = 0.07;

    // siga o exemplo acima para criar o sprite de car2
    car2 = createSprite (width/2 + 100, height - 100);
    car2.addImage("car2",car2_img);
    car2.scale = 0.07;

    // atribua os objetos ao vetor cars
    cars=[car1,car2]
    moedas=new Group()
    combustivel=new Group()
    this.addSprites(combustivel,4,combustivelImg,0.02)
    this.addSprites(moedas,18,moedasImg,0.09)
  }
  addSprites(spriteGroup,numerodesprites,spriteImage,scale){
   for(var i=0;i<numerodesprites;i++){
    var x,y
    x=random(width/2+150,width/2-150)
    y=random(-height*4.5,height-400)
    var sprite=createSprite(x,y)
    sprite.addImage(spriteImage)
    sprite.scale=scale
    spriteGroup.add(sprite)
   } 
  }
  handleElements(){
    // adicione os estilos à imagem do título.
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffects")
  }

  play () {

    //chame a função para esconder os elementos
    this.handleElements();
    Player.getPlayerInfo()
    if(allPlayers !== undefined){
      image(track,0,-height*5,width,height*6)
      var index=0
      for(var plr  in allPlayers){
        index=index+1
        var x=allPlayers[plr].positionX
        var y=height-allPlayers[plr].positionY
        cars[index-1].position.x=x
        cars[index-1].position.y=y
        if(keyIsDown(UP_ARROW)){
          player.positionY += 10
          player.update()
        }
      }
    }
    //chame a função para criar os sprites
    if(index===player.index){
      stroke(10)
      fill("red")
      ellipse(x,y,60,60)
      this.handleCombustivel(index)
      this.handleMoedas(index)
    }
    drawSprites();
  
  }
  handleCombustivel(index){
    cars[index-1].overlap(combustivel,function(collector,collected){
      player.fuel=185
      collected.remove()
    })
  }
  handleMoedas(index){
    cars[index-1].overlap(moedas,function(collector,collected){
      player.score+=21
      player.update()
      collected.remove()
    })
  }
}
