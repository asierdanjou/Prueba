var app = {
    inicio: function(){
        this.iniciaBotones();
        this.iniciaHammer();
    },
    
    iniciaBotones: function(){
        var botonClaro = document.querySelector('#claro');
        var botonOscuro = document.querySelector('#oscuro');
        
        botonClaro.addEventListener('click',this.ponloClaro,false);
        botonOscuro.addEventListener('click',this.ponloOscuro,false);
                
    },
    
    iniciaHammer: function(){
        var zona = document.getElementById('zona-gestos');
        var hammertime = new Hammer(zona);
        
        //hammertime.get('pinch').set({ enable: true});
        hammertime.get('rotate').set({ enable: true});
        
        zona.addEventListener('webkitAnimationEnd',function(ev){
            zona.className='';                   
        });
        
        hammertime.on('doubletap', function(ev){
            //zona.className='';                   
            zona.className='doubletap';
            document.querySelector('#info').innerHTML=ev.type;
        });
        
        hammertime.on('press', function(ev){
            //zona.className='';                   
            zona.className='press';
            document.querySelector('#info').innerHTML=ev.type;
        });

        hammertime.on('swipe', function(ev){
            var clase=undefined;
            direccion=ev.direction;
            if (direccion==4) clase='swipe-derecha';
            if (direccion==2) clase='swipe-izquierda';
            zona.className=clase;
        });
        
        hammertime.on('rotate', function(ev){
            var umbral=25;
            if (ev.distance>umbral){ 
                zona.className='rotat';
                document.querySelector('#info').innerHTML=ev.type;
            }
        });
    },
    
    ponloClaro: function(){
        document.body.className = 'claro';
    },
    
    ponloOscuro: function(){
        document.body.className = 'oscuro';
    }
};

if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        FastClick.attach(document.body);
        app.inicio();
    }, false);
}
//app.inicio();