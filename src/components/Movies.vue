<template>
    <section id="films">
        <div class="container">
            <div class="row mb-3">
                <div class="col-12 text-center">
                    <h3>
                        Films
                    </h3>
                </div>
            </div>
            <div class="row justify-content-center align-items-center">
                <div class="col-4">
                    <div class="form-group">
                        <label class="d-block text-center" for="film">Search Film</label>
                        <input type="text" class="form-control text-center" id="film" v-model="sorted.search">
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-group">
                        <label class="d-block text-center" for="type">Type</label>
                        <select name="type" id="type" class="form-control" v-model="sorted.type">
                            <option value="movie" selected>Movies</option>
                            <option value="tv">TV</option>
                        </select>
                    </div>
                </div>
                <div class="col-2">
                    <div class="form-group">
                        <label class="d-block text-center" for="genres">Genre</label>
                        <select name="type" id="genres" class="form-control" v-model="sorted.genre">
                            <option value="notset">Not Set</option>
                            <option :value="genre.id" v-for="genre in genres">
                              {{ genre.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row content">
                <div class="col-12 text-center" v-show="movies.length === 0">
                    <i class="far fa-frown fa-5x mb-4"></i>
                    <h3 class="text-center font-weight-bold">
                        Sorry.. we couldn't find what you were looking for
                    </h3>
                </div>

                <div class="col-md-4 mb-4" v-show="movies.length > 0" v-for="movie in movies.slice(0,15)" :key="movie.id">
                    <div class="card">
                        <div class="card-body">
                            <img :src="`${basePath}/w500/${movie.poster_path}`" alt="Poster" class="img-poster">
                            <h5 class="movie-title text-center">
                                {{ sorted.type === 'movie' ? movie.title : movie.name }}
                            </h5>
                          <div class="row">
                            <div class="col-12 text-center genres">
                              <span v-for="(genre, i) in setGenres(movie.genre_ids)" :key="i">{{ genre }}</span>
                            </div>
                            <div class="col-12 mt-3 overview">
                              <div class="row justify-content-center align-items-center text-center">
                                <div class="col-6">
                                  <p>Popularity</p>
                                  <i class="fas fa-users"></i>
                                  <span>{{ movie.popularity }}</span>
                                </div>
                                <div class="col-6">
                                  <p>Ratings</p>
                                  <i class="fas fa-star"></i>
                                  <span>{{ movie.vote_average }}</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-12">
                              <router-link
                                  :to="{
                                      name: 'detail',
                                      params:{
                                        id: movie.id,
                                        type: sorted.type,
                                      }
                                  }"
                                  class="btn btn-primary">
                                <i class="fas fa-eye"></i>
                                <span>See detail</span>
                              </router-link>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>

          <nav aria-label="Page navigation example" class="mt-3" v-show="sorted.search === '' ">
            <ul class="pagination justify-content-center">
              <li :class="['page-item', sorted.pages === 1 ? 'disabled' : '']">
                <a class="page-link" href="#" tabindex="-1" @click.prevent="sorted.pages -= 1">Previous</a>
              </li>
              <li :class="['page-item', sorted.pages === 300 ? 'disabled' : '']">
                <a class="page-link" href="#" @click.prevent="sorted.pages += 1">Next</a>
              </li>
            </ul>
          </nav>

        </div>
    </section>
</template>

<script>
    export default {
        name: "Movies",

        created(){
            this.getMovies(this.sorted.type)
            this.getGenres(this.sorted.type)
            this.setConfig()
        },

        data(){
            return{
                movies:[],
                genres:[],
                sorted:{
                    type:'movie',
                    search:'',
                    pages: 1,
                    genre: 'notset'
                },
                basePath:''
            }
        },

        methods:{
            setConfig(){
            axios.get(`/configuration`, {
              params:{
                'api_key': apiKey
              }
            })
                .then(res => this.basePath = res.data.images.secure_base_url)
          },

            getMovies(type){
                axios.get(`/${type}/top_rated`, {
                   params:{
                       'api_key': apiKey,
                       'language': 'en-US',
                       'page': this.sorted.pages
                   }
                })
                .then(res => this.movies = res.data.results)
                .catch(err => alert(err.response.data.status_message))
            },

            getGenres(type){
                    axios.get(`/genre/${type}/list`, {
                    params:{
                        'api_key': apiKey,
                        'language': 'en-US'
                    }
                })
                    .then(res => this.genres = res.data.genres)
            },

            setGenres(genres){
               let sel = [];

                this.genres.forEach(genreA => {
                  genres.forEach(genreB => {
                    if(genreA.id === genreB){
                      sel.push(genreA.name)
                    }
                  })
                })

               return sel;
            }
        },

        computed:{
            type(){
                return this.sorted.type
            },

            search(){
              return this.sorted.search
            },

            page(){
              return this.sorted.pages
            },

            genre(){
              return this.sorted.genre
            }
        },

        watch:{
            type: function(type){
                this.getMovies(type)
            },

            search: function(title){
                if(title !== ''){
                  axios.get(`/search/${this.type}`, {
                    params:{
                      'api_key': apiKey,
                      'language': 'en-US',
                      'query': title,
                      'page': 1,
                      'include_adult': false
                    }
                  })
                      .then(res => {
                        this.movies = res.data.results
                      })
                      .catch(err => alert(err.response.data.status_message))
                }
                else{
                  this.getMovies(this.type)
                }
            },

            page: function(page){
              axios.get(`/${this.type}/top_rated`, {
                params:{
                  'api_key': apiKey,
                  'language': 'en-US',
                  'page': page
                }
              })
                  .then(res => {
                    this.movies = res.data.results
                  })
                  .catch(err => alert(err.response.data.status_message))
            },

            genre: function(genre){
              axios.get(`/discover/${this.type}`, {
                params:{
                  'api_key': apiKey,
                  'language': 'en-US',
                  'sort_by': 'popularity.desc',
                  'include_adult': false,
                  'include_video': false,
                  'page': this.page,
                  'with_genres': genre
                }
              })
              .then(res => this.movies = res.data.results)
            }
        }
    }
</script>

<style scoped>
section#films{
    margin-top: 3rem;
    width: 100vw;
    min-height: 50vh;
    height: auto;
}

    .row.content{
        margin-top: 3rem;
    }

    .movie-title{
        font-weight: 600
    }

    .img-poster{
        height: 280px;
        width:100%;
        margin-bottom: 1.5rem;
    }

    .btn-primary{
      margin-top: 1.5rem;
      background-color: var(--primaryColor) !important;
      text-align:center;
      width:100%;
      border-color: var(--primaryColor)
    }
    .btn-primary:hover{
      border-color: var(--primaryColor)
    }
    .btn-primary:active{
      border-color: var(--primaryColor) !important
    }

    .genres span:not(:last-child)::after{
      content:', '
    }

    .overview p{
      margin-bottom: 5px;
    }
</style>