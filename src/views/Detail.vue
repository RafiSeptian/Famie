<template>
  <div>
    <header id="header">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <img :src="`${basePath}/original/${film.poster_path}`" alt="">
            <h3 class="movie-title text-center mt-4">
              {{ type === 'movie' ? film.title : film.name }}
            </h3>
          </div>
          <div class="col-12 overview">
            <div class="row justify-content-center align-items-center text-center">
              <div class="col-2">
                <i class="fas fa-users"></i>
                <span>{{ film.popularity }}</span>
              </div>
              <div class="col-2">
                <i class="fas fa-star"></i>
                <span>{{ film.vote_average }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <table class="table">
              <tr class="lists">
                <td width="25%">
                  <h5 class="font-weight-bold">
                    Genres
                  </h5>
                </td>
                <td>:</td>
                <td>
                  <span v-for="(genre, i) in film.genres" :key="i">
                    {{ genre.name }}
                  </span>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  <h5 class="font-weight-bold">
                    Released Date
                  </h5>
                </td>
                <td>:</td>
                <td>
                  <span>
                    {{ type === 'movie' ? film.release_date : film.first_air_date | toHumanDate }}
                  </span>
                </td>
              </tr>
              <tr class="lists">
                <td width="25%">
                  <h5 class="font-weight-bold">
                    Production Companies
                  </h5>
                </td>
                <td>:</td>
                <td>
                  <span v-for="(company, i) in film.production_companies" :key="i">
                    {{ company.name }}
                  </span>
                </td>
              </tr>
              <tr v-show="film.runtime">
                <td width="25%">
                  <h5 class="font-weight-bold">
                    Runtime
                  </h5>
                </td>
                <td>:</td>
                <td>
                  <span>
                    {{ film.runtime }} Minutes
                  </span>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  <h5 class="font-weight-bold">
                    Synopsis
                  </h5>
                </td>
                <td>:</td>
                <td>
                  <span>
                    {{ film.overview }}
                  </span>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  <h5 class="font-weight-bold">
                    Status
                  </h5>
                </td>
                <td>:</td>
                <td>
                  <span>
                    {{ film.status }}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section id="recommendation" v-show="recommends.length > 0">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12">
            <h3 class="text-white text-center">
              Recommended for you
            </h3>
          </div>
        </div>
        <div class="row films">
          <div class="col-md-4 mb-4 btn position-relative" v-for="recomm in recommends.slice(0, 6)" @click="getFilm(type, recomm.id)">
            <img :src="`${basePath}/w300/${recomm.poster_path}`" alt="">
            <h4 class="text-center mt-3">
              {{ type === 'movie' ? recomm.title : recomm.name }}
            </h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Detail",

  props: ['id', 'type'],

  created(){
    this.setConfig()
    this.getFilm(this.type, this.id)
  },

  data(){
    return{
      film:{},
      recommends:[],
      basePath: ''
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

    getFilm(type, id){
      axios.get(`/${type}/${id}`, {
        params:{
          'api_key': apiKey,
          'language': 'en-US'
        }
      })
          .then(res => {
            this.film = res.data
            this.getRecommendation(type, id)
            window.scrollTo(0, 0)
          })
          .catch(err => {
            alert(err.response.data.status_message)
            this.$router.push('/')
          })
    },

    getRecommendation(type, id){
      axios.get(`/${type}/${id}/recommendations`, {
        params:{
          'api_key': apiKey,
          'language': 'en-US'
        }
      })
          .then(res => this.recommends = res.data.results)
          .catch(err => {
            alert(err.response.data.status_message)
            this.$router.push('/')
          })
    },
  },
}
</script>

<style scoped>
#header{
  width:100vw;
  height: 102vh;
  background-color: var(--accentColor);
  color: #fafafa;
}

#header .container{
  width:100%;
  height:100%;
  position:relative;
}

#header .container .row{
  width:100%;
  height:100%;
}

#header .container img{
  margin-top: 3rem !important;
  display: block;
  margin:0 auto;
  width:100%;
  height: 77vh;
}

.overview{
  margin-bottom: 2rem;
}

.fa-users{
  color: #fafafa;
}

section#content{
  margin: 3rem 0;
}

section#content .container .row h4{
  margin-bottom: 10px !important;
}

.lists span:not(:last-child)::after{
  content: ', '
}

.table th, .table td{
  border-top: unset !important;
}

section#recommendation{
  padding: 35px;
  background-color: var(--accentColor);
  color: #fafafa;
}

section#recommendation h3::after{
  content:'';
  display:block;
  width: 7%;
  padding-top: 15px;
  border-bottom: 3px solid #fafafa;
  margin:0 auto;
}

section#recommendation .films img{
  width:100%;
  height: 280px;
}

section#recommendation .films h4{
  color: #fafafa;
}
</style>