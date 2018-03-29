var buttonNames = ['','', '']; // one-dimensional array. music variable is a two-dimensional array
//var buttonNames = new Array(50);   // array object without data
var genreArray = [5,8,7];
var colorArray = ['#457FFD','#2DE7F0','#FA5C46'];//Rock, Classic, Alternative
var	genreScale = d3.scale.linear().domain([0,20]).range([0,360]);
var songScale = d3.scale.sqrt().domain([0,1276]).range([0,20]);
var songTitle;
var artistsTitle;

var selectedSong;
d3.select('#container')
	.append('audio')
	.attr('id','audioElement');

//Background
d3.select ('#svg')
.append('image')
    .attr('xlink:href','images/background.png')
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 724)
    .attr("width", 1024)
.style('fill','#182754');

//Title
d3.select('#svg')                      
	.append('text')
 	.text('Music')
    .attr('id','title')
	.attr('x',30)
    .attr('y',90)
    .style('font-family','Roboto')
    .style('font-style','Black 900')
    .style('text-anchor','start')
	.style('font-size','90px')
    .style('fill','#F4F4F4');

d3.select('#svg')                      
	.append('text')
 	.text('Visualizer')
    .attr('id','title')
	.attr('x',35)
    .attr('y',138)
    .style('font-family','Roboto')
    .style('font-style','Black 900')
    .style('text-anchor','start')
	.style('font-size','54px')
    .style('fill','#FA5C46');

d3.select('#svg')                      
	.append('text')
 	.text('by Weifu Wen')
    .attr('id','title')
	.attr('x',190)
    .attr('y',155)
    .style('font-family','Roboto')
    .style('font-style','regular')
    .style('text-anchor','start')
	.style('font-size','12px')
    .style('fill','#F4f4f4');

//Progress bar
function drawProgressBar() {
 d3.select('#svg')
        .append('rect')
        .attr('id','progressBar')
        .attr('x','320')
        .attr('y','598')
        .attr("height", 2)
        .attr("width", 400)
		.style('cursor','pointer')
        .style('fill','none')
        .style('stroke','#121E40')
        .style('stroke-width',4)
        .style('stroke-linecap','round')
        .style('stroke-linejoin','round');
}

     
function drawProgressCircle() {
       d3.select('#svg')
        .append('image')
		.attr('id','progressCircle')
		.attr('xlink:href','images/rocket.png')
		.attr('x',300)
		.attr('y',550)
        .attr("height", '100')
        .attr("width", '100')
			.transition()
	  		.ease('linear')
			.duration(function(d,i) {
				return rockSongs[i][4]*1000; // gets duration of selected song
				})
	  		.attr('x',700);
      };
      

// control

var remainingTime;
var elapsedWidth;
var elapsedPercent;
      
function drawButtons() {
	d3.select('#svg')
		.selectAll('buttons')
		.data(buttonNames)
		.enter()
		.append('circle')
		.attr('id',function(d,i) { return 'button_' + i; })
		.attr('class',function(d,i) { return 'buttons button_' + d; })
		.attr('cx',100)
		.attr('cy',function(d,i) { return 425 + i * 80; })
		.attr('r',30) 
		.style('fill','#f4f4f4')
		.style('cursor','pointer')
		.on('mouseover',function(d,i) {
        
        if(i == 0) { 
     d3.select(this)
         .style('stroke','#FFFFFF')
         .style('stroke-width',4);
				}
			else if(i == 1) { 
			 d3.select(this)
         .style('stroke','#FFFFFF')
         .style('stroke-width',4);
				}
			else if(i == 2) { 
				 d3.select(this)
         .style('stroke','#FFFFFF')
         .style('stroke-width',4);
				}
			})
    
       .on('mouseout',function() {
               d3.select(this).style('stroke-width',0);
        
			})
		
       .on('click',function(d, i) { 
                if(i == 0) { 
                     
               audioElement.play();
               d3.select('#progressCircle').transition().ease('linear').duration(remainingTime); 
            
				}
			else if(i == 1) { 
                 
                audioElement.pause();
                d3.select('#progressCircle').transition().duration(0); 
			    elapsedWidth = d3.select('#progressCircle').attr('width');
			    elapsedPercent = elapsedWidth / 0;
			    remainingTime = selectedDuration - (elapsedPercent * selectedDuration);
				}
			else if(i == 2) { 
                drawMeteos_2();
                d3.selectAll('#text_1,#text_2,#text_3').remove();
                d3.selectAll ('#songinfo_3,#songinfo,#songinfo_2').remove();
                d3.selectAll('.notes').remove();
                d3.selectAll('donutArcs').remove();
                drawDonut();
                d3.selectAll('#star').remove();
                d3.selectAll ('#progressCircle,#progressBar').remove();
                audioElement.pause();
        drawDonut();
                d3.selectAll('.notes').remove();
            }
				
			})
    
    //Button Icons
    //home
    d3.select('#svg')
		.append('image')
		.attr('id','home')
		.attr('xlink:href','images/home.png')
        .attr('x','85px')
        .attr('y','570px')
		.attr('height','30px')
		.attr('width','30px')
    .style('cursor','pointer')
       /*.on('mouseover',function() {
               d3.select(this)
                    .attr('height','30px')
		            .attr('width','30px')
			})
    
      .on('mouseout',function() {
               d3.select(this)
                    .attr('height','25px')
		            .attr('width','25px')
			})*/
      .on('click',function() {
        drawMeteos_1();
     d3.selectAll('.notes').remove();
   d3.selectAll ('#songinfo_3,#songinfo,#songinfo_2').remove();
   d3.selectAll ('#progressCircle,#progressBar').remove();
    drawMeteos_1();
	drawDonut();
    audioElement.pause();
        
        
        d3.selectAll('#star').remove();
			})
    
    //pause
    d3.select('#svg')
		.append('image')
		.attr('id','pause')
		.attr('xlink:href','images/pause.png')
        .attr('x','86px')
        .attr('y','490px')
		.attr('height','30px')
		.attr('width','30px')
    .style('cursor','pointer')
        .on('click',function() {
            drawMeteos_2();
			audioElement.pause();
            d3.select('#progressCircle').transition().duration(0); 
			    elapsedWidth = d3.select('#progressCircle').attr('width');
			    elapsedPercent = elapsedWidth / 0;
			    remainingTime = selectedDuration - (elapsedPercent * selectedDuration);
			}) 
    //play    
    d3.select('#svg')
		.append('image')
		.attr('id','play')
		.attr('xlink:href','images/play.png')
        .attr('x','88px')
        .attr('y','410px')
		.attr('height','30px')
		.attr('width','30px')
    .style('cursor','pointer')
        .on('click',function() {
        drawMeteos_3();
        audioElement.play();
        d3.select('#progressCircle')
			.transition()
	  		.ease('linear')
			.duration(function(d,i) {
				return rockSongs[i][4]*1000; // gets duration of selected song
				})
	  		.attr('x',700);
        
        d3.select('#progressCircle')
			.transition()
	  		.ease('linear')
			.duration(function(d,i) {
				return classicalSongs[i][4]*1000; // gets duration of selected song
				})
	  		.attr('x',700);
        
        d3.select('#progressCircle')
			.transition()
	  		.ease('linear')
			.duration(function(d,i) {
				return altSongs[i][4]*1000; // gets duration of selected song
				})
	  		.attr('x',700);
        
			}) 
       
  
     d3.select('#svg')                      
		.selectAll('buttonTitles')
		.data(buttonNames)
		.enter()
		.append('text')
 		.text(function(d,i) { return d; })
    	.attr('class','buttonTitles')
		.attr('x',175)
    	.attr('y',function(d,i) { return 428 + i * 60; })
        .style('font-family','Roboto ')
        .style('font-style','regular')
		.style('font-size','18px')
    	.style('text-anchor','middle')
    	.style('letter-spacing',1)
    	.style('stroke-width',0)
    	.style('fill','#182754')
		.style('pointer-events','none')
       
	;
}



function drawDonut() {													
	var arcCircumference = 100 * 2 * Math.PI;
	d3.select('#svg').selectAll('donutArcs') 									
        
        .data(genreArray)
        .enter()
        .append('circle')
		.style('stroke',function(d,i) {
		    return colorArray[i];
            }) 
        .style('stroke-width',150)
        .style('fill','none')
        .attr('r',100)
        .attr('cx',512)  	
        .attr('cy',295) 
		.style('stroke-dasharray',arcCircumference)
        .style('stroke-dashoffset',function(d,i) {
            var offset = arcCircumference - (arcCircumference * (d / 20));
            return offset;
            })
        .attr('transform',function(d,i) {
			if(i == 0) { 
				return 'rotate(0,512,295)'; 
				}
			else if(i == 1) { 
				var arcRotation = genreScale(genreArray[0]); 
				return 'rotate(' + arcRotation + ',512,295)';	
				}
			else if(i == 2) { 
				var arcRotation = genreScale(genreArray[0] + genreArray[1]); 
				return 'rotate(' + arcRotation + ',512,295)';	
				}
             })
        .style('cursor','pointer')
    
   

    .on('mouseover',function(d,i) {
          if(i == 0) { 
                d3.select(this)
                .transition()
		        .delay(0)
		        .duration(500)
                .style('stroke-width',160);
              
            
  d3.select('#svg') 
    .append('text')
    .text('rock 25%')
    .attr('id','text_1')
	.attr('x',450)
    .attr('y',520)
    .style('font-family','Roboto ')
    .style('font-style','bold')
    .style('text-anchor','start')
	.style('font-size','30px')
    .style('fill','#457FFD')
    .style('cursor','pointer')
  
  d3.selectAll('#text_2,#text_3').remove();
            

}
			
        else if(i == 1) { 
				d3.select(this)
                .transition()
		        .delay(0)
		        .duration(500)
                .style('stroke-width',160);	
               
  
  d3.select('#svg') 
    .append('text')
    .text('classical 35%')
    .attr('id','text_2')
	.attr('x',415)
    .attr('y',520)
    .style('font-family','Roboto ')
    .style('font-style','bold')
    .style('text-anchor','start')
	.style('font-size','30px')
    .style('letter-spacing',1)
    .style('fill','#2DE7F0')
    .style('cursor','pointer')
  
  d3.selectAll('#text_1,#text_3').remove();
       
                
				}
			else if(i == 2) { 
				d3.select(this)
                    .transition()
		        .delay(0)
		        .duration(500)
                .style('stroke-width',160);	
                

                
  d3.select('#svg') 
    .append('text')
    .text('alternative 45%')
    .attr('id','text_3')
	.attr('x',410)
    .attr('y',520)
    .style('font-family','Roboto ')
    .style('font-style','bold')
    .style('text-anchor','start')
	.style('font-size','30px')
    .style('letter-spacing',1)
    .style('fill','#FA5C46')
    .style('cursor','pointer')
  
  d3.selectAll('#text_1,#text_2').remove();
                
				}
        
			})
        
        .on('mouseout',function(d,i) {
        d3.select(this)
                .transition()
		        .delay(0)
		        .duration(500)
                .style('stroke-width',150);
                })
    

        .on('click',function(d,i) {
   
         
        if(i == 0) { 
        
                
               d3.selectAll('.rockSongs,.rockSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,231)');
                
                d3.selectAll('.classicalSongs,.classicalSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,0)');
                
                d3.selectAll('.altSongs,.altSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,0)');
            
                        
d3.selectAll('#text_2,#text_3').remove();
           
            drawMeteos_2();
            drawGenreCircles();
            moveGenreCircles();
            drawDonut2();
      
    }
       
        else if(i == 1) { 
                d3.selectAll('.rockSongs,.rockSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,0)');
                
                d3.selectAll('.classicalSongs,.classicalSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,231)');
                
                d3.selectAll('.altSongs,.altSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,0)');
                
d3.selectAll('#text_1,#text_3').remove();
              
              drawMeteos_1();
               drawGenreCircles();
               moveGenreCircles();
             
        var arcCircumference = 100 * 2 * Math.PI;
	    d3.select('#svg').selectAll('donutArcs') 									
        
        .data(genreArray)
        .enter()
        .append('circle') 
        .style('stroke-width',150)
        .style('fill','none')
        .attr('r',100)
        .attr('cx',512)  	
        .attr('cy',295) 
		.style('stroke-dasharray',arcCircumference)
        .style('cursor','pointer')
        
        .transition()
        .duration(1000)
        .style('stroke','#2DE7F0')
        .attr ('transform',function(d,i){
            var angleRotation= i * 12;
            return 'rotate(0,512,295)';
         
            
    })
    }
			else if(i == 2) { 
                
                d3.selectAll('.rockSongs,.rockSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,0)');
                
                d3.selectAll('.classicalSongs,.classicalSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,0)');
                
                d3.selectAll('.altSongs,.altSongTitles')
                .transition()
                .duration(1000)
                .attr('transform','translate(0,231)');

d3.selectAll('#text_1,#text_2').remove();
                
                drawMeteos_3();
                drawGenreCircles();
                moveGenreCircles();
            
                
  
         var arcCircumference = 100 * 2 * Math.PI;
	     d3.select('#svg').selectAll('donutArcs') 									
        
        .data(genreArray)
        .enter()
        .append('circle') 
        .style('stroke-width',150)
        .style('fill','none')
        .attr('r',100)
        .attr('cx',512)  	
        .attr('cy',295) 
		.style('stroke-dasharray',arcCircumference)
        .style('cursor','pointer')
        
        .transition()
        .duration(1000)
        .style('stroke','#FA5C46')
        .attr ('transform',function(d,i){
            var angleRotation= i * 12;
            return 'rotate(0,512,295)';
           
          
    })
    }
    });
 }

function drawDonut2(){

var arcCircumference = 100 * 2 * Math.PI;
	    d3.select('#svg').selectAll('donutArcs') 									
        
        .data(genreArray)
        .enter()
        .append('circle') 
        .style('stroke-width',150)
        .style('fill','none')
        .attr('r',100)
        .attr('cx',512)  	
        .attr('cy',295) 
		.style('stroke-dasharray',arcCircumference)
        .style('cursor','pointer')
        
        .transition()
        .duration(1000)
        .style('stroke','#457FFD')
        .attr ('transform',function(d,i){
            var angleRotation= i * 12;
            return 'rotate(0,512,295)';
        
           
    })
}

function drawDonut2(){

var arcCircumference = 100 * 2 * Math.PI;
	    d3.select('#svg').selectAll('donutArcs') 									
        
        .data(genreArray)
        .enter()
        .append('circle') 
        .style('stroke-width',150)
        .style('fill','none')
        .attr('r',100)
        .attr('cx',512)  	
        .attr('cy',295) 
		.style('stroke-dasharray',arcCircumference)
        .style('cursor','pointer')
        
        .transition()
        .duration(1000)
        .style('stroke','#457FFD')
        .attr ('transform',function(d,i){
            var angleRotation= i * 12;
            return 'rotate(0,512,295)';
        
           
    })
}


var rockSongs = [];
var classicalSongs = [];
var altSongs = [];
var rockAudio = [];
var classicalAudio = [];
var altAudio = [];

//playlists
function dropMenu_1() {
    
  for(var i = 0; i < music.length; i++) {
        if(music[i][3] == "Rock") {
            rockSongs.push(music[i]);
            rockAudio.push(music[i][6]);
            }
        }

    d3.select('#svg')
        .selectAll('rockSongs')
        .data(rockSongs)
        .enter()
        .append('rect')
        .attr('class','rockSongs')
        .attr('x',720)
        .attr('y',function(d,i) {
            return -231 + i * 20; // 1
            })
        .attr('rx',5)
		.attr('ry',5)
        .attr('width',260)
        .attr('height',30)
		.style('cursor','pointer')
        .style('fill','#457FFD')

    
        .on('mouseout',function(d,i) {
        d3.select(this).style('fill','#457FFD');
        
        })
    
       .on('mouseover',function(d,i) {
        
        
        d3.select(this).style('fill','#456FFD');
        })
        
        .on('click',function(d,i) {
         
        selectedSong;
        audioElement.pause();
   

         drawMeteos_1();
        
         songTitle = d[0];
         d3.select('#songinfo').remove();
         drawSongText();
          d3.select('#progressCircle').remove();
         drawProgressBar();
         drawProgressCircle();
         
         
         
        artistsTitle = d[1];
        d3.select('#songinfo_2').remove();
        drawArtist();
        
        
        selectedSong = rockAudio[i];
        d3.select('#audioElement').attr('src',selectedSong);
        audioElement.play();
        
        d3.select(this).style('fill','#456FFD');
        
     
             drawGrid();
           
   });
   

   	
   d3.select('#svg')                      
        .selectAll('rockSongs')
        .data(rockSongs)
        .enter()
		.append("text")
 		.text(function(d,i) {
            return d[0]; // changed to display only son title
            })
		.style('pointer-events','none')
        .attr('class','rockSongTitles')
        .attr("x",852)
        .attr("y",function(d,i) {
            return -216 + i * 20; // 19
            })
         .style('font-family','Roboto')
         .style('font-style','regualr')
        .style("font-size","10px")
        .style("text-anchor","middle")
        .style("fill",'#182754')
        
    .on('mouseover',function(d,i) {
       
        });
   
 }
    

function dropMenu_2() {
    
  for(var i = 0; i < music.length; i++) {
        if(music[i][3] == "Classical") {
            classicalSongs.push(music[i]);
            classicalAudio.push(music[i][6]);
           }
        }

    d3.select('#svg')
        .selectAll('classicalSongs')
        .data(classicalSongs)
        .enter()
        .append('rect')
        .attr('class','classicalSongs')
        .attr('x',750)
        .attr('y',function(d,i) {
            return -231 + i * 20; // 1
            })
        .attr('rx',5)
		.attr('ry',5)
        .attr('width',250)
        .attr('height',30)
		.style('cursor','pointer')
        .style('fill','#2DE7F0')
    
    
       .on('mouseout',function(d,i) {
        d3.select(this).style('fill','#2DE7F0');
      
        })
    
       .on('mouseover',function(d,i) {
        
        
        d3.select(this).style('fill','#2DD7F0');
        })        
        
        .on('click',function(d,i) {
          selectedSong = '';
      
  		audioElement.pause();
        
        d3.select('#progressCircle').remove();
         drawProgressBar();
         drawProgressCircle();
    
        drawMeteos_2();
        songTitle = d[0];
        d3.select('#songinfo').remove();
        drawSongText();
        
        artistsTitle = d[1];
        d3.select('#songinfo_2').remove();
        drawArtist();
        
			selectedSong = classicalAudio[i];
			d3.select('#audioElement').attr('src',selectedSong);
			audioElement.play();
        
        drawGrid();
        });
        
  	d3.select('#svg')                      
        .selectAll('classicalSongs')
        .data(classicalSongs)
        .enter()
		.append("text")
 		.text(function(d,i) {
            return d[0];
            })
		.style('pointer-events','none')
        .attr('class','classicalSongTitles')
        .attr("x",880)
        .attr("y",function(d,i) {
            return -216 + i * 20; // 19
            })
        .style('font-family','Roboto ')
       .style('font-style','bold')
        .style("font-size","10px")
        .style("text-anchor","middle")
        .style("fill",'#182754');   
}

function dropMenu_3() {
    
  for(var i = 0; i < music.length; i++) {
        if(music[i][3] == "Alternative") {
            altSongs.push(music[i]);
            altAudio.push(music[i][6]);
            }
        }

    
    d3.select('#svg')
        .selectAll('altSongs')
        .data(altSongs)
        .enter()
        .append('rect')
        .attr('class','altSongs')
        .attr('x',750)
        .attr('y',function(d,i) {
            return -251 + i * 20; // 1
            })
        .attr('rx',5)
		.attr('ry',5)
        .attr('width',250)
        .attr('height',30)
		.style('cursor','pointer')
        .style('fill','#FA5C46')
    
    .on('mouseout',function(d,i) {
        d3.select(this).style('fill','#FA5C46');
        })
    
       .on('mouseover',function(d,i) {
           
        
        d3.select(this).style('fill','#FA6C46');
        })        
     
        .on('click',function(d,i) {
         selectedSong = '';
         audioElement.pause();
        
         d3.select('#progressCircle').remove();
         drawProgressBar();
         drawProgressCircle();
        
        drawMeteos_3();
        songTitle = d[0];
        d3.select ('#songinfo').remove();
        drawSongText();
        
        artistsTitle = d[1];
        d3.select('#songinfo_2').remove();
        drawArtist();
        
        selectedSong = altAudio[i];
        d3.select('#audioElement').attr('src',selectedSong);
        audioElement.play();
         
        
        
            drawGrid();
       });
    
 
   	d3.select('#svg')                      
        .selectAll('altSongs')
        .data(altSongs)
        .enter()
		.append("text")
 		.text(function(d,i) {
            return d[0];
            })
		.style('pointer-events','none')
        .attr('class','altSongTitles')
        .attr("x",880)
        .attr("y",function(d,i) {
            return -236 + i * 20; // 19
            })
        .style('font-family','Roboto ')
        .style('font-style','bold')
        .style("font-size","10px")
        .style("text-anchor","middle")
        .style("fill",'#182754'); 
     
    
}

//song info
function drawSongText() {
       d3.select('#svg')
		.append('text')
 		.text(songTitle)
        .attr("id",'songinfo')
        .attr("x", 520) 
        .attr("y",670)  
        .style('font-family','Roboto')
        .style('font-style','light')
        .style("font-size","20px")
        .style('text-anchor','middle')
        .style("fill",'#F4F4F4');
    
}

function drawArtist() {
       d3.select('#svg')
		.append('text')
 		.text(artistsTitle)
        .attr("id",'songinfo_2')
        .attr("x", 520) 
        .attr("y",640)  
        .style('font-family','Roboto ')
        .style('font-style','light')
        .style("font-size","15px")
        .style('text-anchor','middle')
        .style("fill",'#F4F4F4');
    
}

// falling star
function drawMeteos_1() {
d3.select ('#svg')
.append('image')
    .attr('id','rock_1')
    .attr('xlink:href','images/meteorite.png')
    .attr("x", 0)
    .attr("y", 100)
    .attr("height", 80)
    .attr("width", 80)
			.transition()
	  		.ease('linear')
			.duration('500')
            .attr("x", 700)
            .attr("y", 800);
}
    
function drawMeteos_2() {    
d3.select ('#svg')
.append('image')
    .attr('id','rock_2')
    .attr('xlink:href','images/meteo2.png')
    .attr("x", 300)
    .attr("y", 0)
    .attr("height", 80)
    .attr("width", 80)
	.style('fill','#182754')
			.transition()
	  		.ease('linear')
			.duration('1000')
            .attr("x", 1000)
            .attr("y", 800);
}

function drawMeteos_3() {
d3.select ('#svg')
.append('image')
    .attr('id','rock_3')
    .attr('xlink:href','images/meteorite.png')
    .attr("x", 200)
    .attr("y", 0)
    .attr("height", 160)
    .attr("width", 160)
	.style('fill','#182754')
			.transition()
	  		.ease('linear')
			.duration('1000')
            .attr("x", 1000)
            .attr("y", 1200);
}

var timer = setInterval('moveGenreCircles()',2000);
//var timerLids = setInterval('moveLids()',2000);

var xPos0;
var yPos0;
var xPos1;
var yPos1;
var xPos2;
var yPos2;

var height0;
var width0;
var height1;
var width1;
var height2;
var width2;

function drawGenreCircles() {
xPos0 = Math.random() * (724 - 0) + 450;
yPos0 = Math.random() * (524 - 0) + 350;
xPos1 = Math.random() * (724 - 0) + 450;
yPos1 = Math.random() * (524 - 0) + 350;
xPos2 = Math.random() * (724 - 0) + 450;
yPos2 = Math.random() * (524 - 0) + 350;
     
height0 = Math.random() * (150 - 100) + 50;
width0 = Math.random() * (150 - 100) + 50;
height1  = Math.random() * (150 - 100) + 50;
width0 = Math.random() * (150 - 100) + 50;
height2 = Math.random() * (150 - 100) + 50;
width0 = Math.random() * (150 - 100) + 50;
    
d3.select('#svg')
	.append('image')
	.attr('id','star')
    .attr('xlink:href','images/aliens.png')
    .attr("height",function(d,i) {
		if(i == 0) { return height0; }
		else if(i == 1) { return height1; }
		else if(i == 2) { return height2; }
		})
    .attr("width",function(d,i) {
		if(i == 0) { return width0; }
		else if(i == 1) { return width1; }
		else if(i == 2) { return width2; }
		})
	.attr('x',function(d,i) {
		if(i == 0) { return xPos0; }
		else if(i == 1) { return xPos1; }
		else if(i == 2) { return xPos2; }
		})
	.attr('y',function(d,i) {
		if(i == 0) { return yPos0; }
		else if(i == 1) { return yPos1; }
		else if(i == 2) { return yPos2; }
		});

    }

function moveGenreCircles() {
xPos0 = Math.random() * (724 - 0) + 450;
yPos0 = Math.random() * (524 - 0) + 350;
xPos1 = Math.random() * (724 - 0) + 450;
yPos1 = Math.random() * (524 - 0) + 350;
xPos2 = Math.random() * (724 - 0) + 450;
yPos2 = Math.random() * (524 - 0) + 350;
    
height0 = Math.random() * (150 - 100) + 50;
width0 = Math.random() * (150 - 100) + 50;
height1  = Math.random() * (150 - 100) + 50;
width0 = Math.random() * (150 - 100) + 50;
height2 = Math.random() * (150 - 100) + 50;
width0 = Math.random() * (150 - 100) + 50;
    
d3.select('#star')
	.transition()
	.duration(2000)
     .attr("height",function(d,i) {
		if(i == 0) { return height0; }
		else if(i == 1) { return height1; }
		else if(i == 2) { return height2; }
		})
    .attr("width",function(d,i) {
		if(i == 0) { return width0; }
		else if(i == 1) { return width1; }
		else if(i == 2) { return width2; }
		})
    .attr('x',function(d,i) {
		if(i == 0) { return xPos0; }
		else if(i == 1) { return xPos1; }
		else if(i == 2) { return xPos2; }
		})
	.attr('y',function(d,i) {
		if(i == 0) { return yPos0; }
		else if(i == 1) { return yPos1; }
		else if(i == 2) { return yPos2; }
		})

}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();
audioElement.crossOrigin = 'anonymous';
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);
var frequencyData = new Uint8Array(5); // generates 390 data points

function drawGrid() {
	var row = 0;
	d3.select('#svg').selectAll('circle.music')
        .data(frequencyData)
        .enter()
		.append('circle')
		.attr('class','notes')
		.attr('cx', 512)
    	.attr('cy', 295)
		.attr('r',10)
	    .style('fill', '#182754');
}

function renderChart() {
    requestAnimationFrame(renderChart);
    analyser.getByteFrequencyData(frequencyData);
	//console.log(frequencyData); // see data stream in javascript console
    d3.selectAll('.notes')
        .data(frequencyData)
        .attr('r',function(d,i) {
            return 55 + d/2;
            })
    
    .style('fill', '#182754')
        /*.style('fill',function(d,i) {
            var randomRed = d3.round(Math.random() * 255);
           var randomGreen = d3.round(Math.random() * 255);
           var randomBlue = d3.round(Math.random() * 255);
            console.log(randomRed);
        return 'rgb(' + randomRed + ',' + randomGreen + ',' + randomBlue + ')';
        

            })*/
		.style('opacity',function(d,i) {
            return d/800;
            })
    ;
}       

renderChart();


// Controls what code is executed on window load. MUST BE LAST CODE IN BEHAVIOR.JS
window.onload = function() {
	drawButtons();
	//drawSongs();
    drawDonut();
    dropMenu_1();
    dropMenu_2();
    dropMenu_3();
 }