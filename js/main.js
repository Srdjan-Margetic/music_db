// ITUNES URL
// https://itunes.apple.com/search?term=ARTIST&entity=album

const musicdb = new musicDB;

function musicDB(){

    this.init = function(){
        this.search();
    }

    this.search = function(){
        const $this = this;
        const form = document.querySelector('#form');

        form.addEventListener("submit",function(e){
            e.preventDefault();
            const value = document.querySelector('#input_search').value;
            form.reset();

            $this.getData(value)
        })
    }

    this.getData = function(artist){

        const $this = this;
        const http = new XMLHttpRequest();
        const url = "https://itunes.apple.com/search?term="+ artist +"&entity=album";
        const method = "GET";
        

        const container = document.querySelector('#album_list_container');
        container.innerHTML = '';

        http.open(method,url);
        http.onreadystatechange = function(){

            if(http.readyState === XMLHttpRequest.DONE && http.status === 200){
                $this.showArtist(JSON.parse(http.response))
                console.log(JSON.parse(http.response))
            } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200){
                // somthing is bad.
            }
        }
        http.send();

    }

    this.showArtist = function(obj){
        const container = document.querySelector('#album_list_container');
        const notMatch = document.querySelector('#not_match')
        let template = '';

        if(obj.results.length > 0){
            notMatch.style.display = 'none';

            for(let i = 0; i < obj.results.length;i++){

                template +=   '<div class="col-sm-3 album_item">'
                template +=     '<div class="item_thmb" style="background:url('+ obj.results[i].artworkUrl100 +')"></div>'
                template +=     '<div class="item_title">'+obj.results[i].collectionName+'</div>'
                template +=     '<div class="item_price">'
                template +=         '<span>Price:</span>'+ obj.results[i].collectionPrice
                template +=     '</div>'
                template +=     '<a href="'+obj.results[i].collectionViewUrl+'" target="_blank">Buy now</a>' 
                template +=   '</div>'

            }

            container.innerHTML ='';
            container.insertAdjacentHTML('afterbegin',template);
        } else{
            notMatch.style.display = 'block';
        }


    }


    this.init();
}

