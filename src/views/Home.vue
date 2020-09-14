<template>
    <div>
        <header id="header">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 left-side">
                        <div class="content">
                            <h1 class="site-title">
                                Get <span>bored</span> during quarantine ?
                            </h1>
                            <p>
                                Don't worry, lets find some interesting movie
                            </p>

                            <button class="btn btn-primary">Let's find</button>
                        </div>
                    </div>
                    <div class="col-md-6 right-side">
                        <img :src="headerImage" class="header-image" alt="">
                    </div>
                </div>
            </div>
        </header>

        <Movies>

        </Movies>
    </div>
</template>

<script>
    import Movies from '../components/Movies'
    export default {
        name: "Home",

        components:{
            Movies
        },

        created(){

        },

        data(){
            return{
                headerImage: './images/cinema.svg'
            }
        }
    }
</script>

<style scoped>
#header{
    background-color: #fafafa;
    width:100vw;
    height: 100vh;
    padding: 35px;
    color: var(--accentColor)
}

#header .container, #header .container .row{
    width:100%;
    height:100%;
}

    .site-title{
        font-size: 55px;
        margin-bottom: 1.5rem;
        font-weight:bold;
        text-shadow: 2px 2px 6px rgba(0, 0,0, .3)
    }

    .site-title span{
        color: var(--primaryColor)
    }

    .left-side p{
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 2rem;
    }

    .btn-primary{
        background-color: var(--primaryColor) !important;
        border-color: var(--primaryColor);
        font-size: 20px;
    }

    .left-side, .right-side{
        position:relative;
        display:flex;
        justify-content:flex-start;
        align-items:center;
    }

    img.header-image{
        width: 420px;
        height: 380px;
    }
</style>