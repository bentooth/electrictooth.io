import { handleActions } from 'redux-actions'
import _ from 'lodash'

let List = [
  {
    name: 'Power of Love',
    singer: 'Shiro Schwarz',
    cover: 'https://i1.sndcdn.com/artworks-000395721468-7hwfpw-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/491608185/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Hungry For The Power',
    singer: 'Azari & III',
    cover: 'https://i1.sndcdn.com/artworks-000047427652-2pnvjd-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/14554141/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Your Tiny Mind (Lifelike Radio Edit)',
    singer: 'Relation',
    cover: 'https://electrictooth.io/uploads/kilian_eng_1.jpg',
    musicSrc: 'https://electrictooth.io/api/stream/Relation - Your Tiny Mind (Lifelike Radio Edit).mp3'
  },
  {
    name: 'Freddie Prinze Junior Prom',
    singer: 'Funk LeBlanc',
    cover: 'https://i1.sndcdn.com/artworks-000401135679-krehu8-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/496434963/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Fiorucci (Moustache Machine Remix)',
    singer: 'Ursula1000',
    cover: 'https://i1.sndcdn.com/artworks-000228246776-nz9znd-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/305254803/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'La Plage',
    singer: 'Rivage',
    cover: 'https://i1.sndcdn.com/artworks-000412091808-hfff2g-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/506419200/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Love Can Be So Hard',
    singer: 'Disclosure',
    cover: 'https://electrictooth.io/uploads/lovecanbesohard.jpg',
    musicSrc: 'https://electrictooth.io/api/stream/Disclosure - Love Can Be So Hard.mp3'
  },
  {
    name: 'After The Storm (Kartell Edit)',
    singer: 'Kali Uchis',
    cover: 'https://i1.sndcdn.com/artworks-000297739215-mcy2wc-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/394854861/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Get To You (Funk LeBlanc Remix)',
    singer: 'La Felix',
    cover: 'https://i1.sndcdn.com/artworks-000406304373-q122az-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/500657877/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Shades Of Grooves',
    singer: 'Agrume',
    cover: 'https://i1.sndcdn.com/artworks-000436955520-vmo2eo-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/527273178/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5',
  },
  {
    name: 'Into The Fire (Ride The Universe Remix)',
    singer: 'JNL+VIKINGS',
    cover: 'https://i1.sndcdn.com/artworks-000249130795-1c8az4-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/348884381/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5',
  },
  {
    name: 'Listen To Me Baby',
    singer: 'Crystal Touch',
    cover: 'https://i1.sndcdn.com/artworks-000205441352-daqv3m-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/305259107/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Flavours',
    singer: 'Sparkly Night',
    cover: 'https://i1.sndcdn.com/artworks-000382698783-0t64kb-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/479746530/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Vår I Øyer (Club Mix)',
    singer: 'Cavego',
    cover: 'https://i1.sndcdn.com/artworks-000417761973-qv4ig4-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/442560498/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Tennishero',
    singer: 'Midnight Love',
    cover: 'https://electrictooth.io/uploads/snowqueen.jpg',
    musicSrc: 'https://electrictooth.io/api/stream/tennishero - midnight love.mp3'
  },
  {
    name: 'Anyone',
    singer: 'Crystal Bats',
    cover: 'https://i1.sndcdn.com/artworks-000209831502-ww06xo-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/309790795/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Rush (Initital Talk Remix)',
    singer: 'Ruby Francis',
    cover: 'https://i1.sndcdn.com/artworks-000412204113-fhzich-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/506543139/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Fond Memory',
    singer: 'Auriént',
    cover: 'https://i1.sndcdn.com/artworks-000119963491-z02yh8-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/209922172/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Breaking Me Down',
    singer: 'Kappekoff',
    cover: 'https://i1.sndcdn.com/artworks-000358722690-7es2ot-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/456039639/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'What Matters',
    singer: 'French Express',
    cover: 'https://i1.sndcdn.com/artworks-000377063637-zc17ro-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/474471072/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Where We Belong',
    singer: 'Purple Disco Machine',
    cover: 'https://i1.sndcdn.com/artworks-000104314655-8ovlrn-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/187456221/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  }, 
  {
    name: 'Let It Go',
    singer: 'Missing Hito',
    cover: 'https://electrictooth.io/uploads/clouds.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/532934634/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  },
  {
    name: 'Cousteau',
    singer: 'Olefonken',
    cover: 'https://i1.sndcdn.com/artworks-000162685832-8ea57t-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/263959138/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  }, 
  {
    name: 'Pale Blue',
    singer: 'The Fin.',
    cover: 'https://i1.sndcdn.com/artworks-000229977696-v9n1dx-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/329445504/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  }, 
  {
    name: 'Time Machine',
    singer: 'Alan Braxe',
    cover: 'https://i1.sndcdn.com/artworks-000290505360-7a09y5-t500x500.jpg',
    musicSrc: 'https://api.soundcloud.com/tracks/388883793/stream?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5'
  }
]

/* BLOG INITIAL STATE & REDUCERS */
const initialState = {
  options: {
    audioLists: _.shuffle(List),
    theme: 'dark',
    bounds: 'body',
    preload: false,
    remove: false,
    defaultPosition: {
      top: 0,
      right: 0
    },
    playModeText: {
      order: 'Order',
      orderLoop: 'Loop-All',
      singleLoop: 'Repeat-One',
      shufflePlay: 'Shuffle'
    },
    openText: 'open',
    panelTitle: 'ET Playlist',
    mode: 'mini',
    once: true,
    autoPlay: false,
    toggleMode: true,
    showMiniProcessBar: false,
    controllerTitle: '',
    showDownload: false,
    showThemeSwitch: false
  }
}

export default handleActions({}, initialState)