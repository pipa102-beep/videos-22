let apiKey = 'SUA_CHAVE_DE_API';  // Substitua pela sua chave de API do YouTube
let channelId = 'UCmAvcHTn0bS6d6O8vQx5ynQ'; // ID do canal de Felipe Neto
let videos = [];

function setup() {
  noLoop();  // Apenas desenha uma vez
  fetchVideos();  // Pega os vídeos do canal do Felipe Neto
}

function draw() {
  // Esse código não desenha na tela com p5.js, mas usamos a função draw para inicializar a interface.
}

function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&key=${apiKey}`;
  loadJSON(url, (data) => {
    videos = data.items.map(item => {
      return {
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.high.url
      };
    });
    displayVideos();  // Exibe os vídeos assim que os dados forem carregados
  });
}

function displayVideos() {
  let container = select('#videos-container');
  videos.forEach((video) => {
    let videoElement = createDiv();
    videoElement.addClass('video-item');
    
    let img = createImg(video.thumbnail);
    img.size(200, 120);
    img.addClass('thumbnail');
    img.parent(videoElement);
    
    let title = createElement('h3', video.title);
    title.addClass('video-title');
    title.parent(videoElement);
    
    let link = createA(`https://www.youtube.com/watch?v=${video.videoId}`, 'Assistir', '_blank');
    link.addClass('video-link');
    link.parent(videoElement);
    
    container.child(videoElement);
  });
}
