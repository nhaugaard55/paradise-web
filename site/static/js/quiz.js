(function () {
  var QUESTIONS_PER_GAME = 10;
  var QUIZ_CONTENT = {
    es: {
      labels: {
        question: 'Pregunta',
        of: 'de',
        score: 'Aciertos',
        startBadge: '10 preguntas',
        startTitle: '¿Cuánto sabés de Península Valdés?',
        startSubtitle: 'Un recorrido breve por la fauna, las temporadas y los paisajes que hacen única a esta esquina de la Patagonia.',
        startButton: 'Empezar quiz',
        nextButton: 'Siguiente',
        correct: 'Respuesta correcta',
        incorrect: 'Respuesta incorrecta',
        explanationTitle: 'Dato de la península',
        playAgain: 'Volver a jugar',
        finalScore: 'Tu resultado',
        scoreSummary: 'Acertaste {score} de {total} preguntas.',
        backHome: 'Volver al sitio',
        viewExcursions: 'Ver excursiones',
        checkAvailability: 'Consultar disponibilidad'
      },
      results: [
        {
          min: 0,
          max: 3,
          title: 'Explorador principiante',
          description: 'Recién empezás a descubrir los secretos de la península. La próxima salida entre mar y estepa te va a enseñar muchísimo más.'
        },
        {
          min: 4,
          max: 7,
          title: 'Amante de la Patagonia',
          description: 'Ya reconocés gran parte de la fauna y las temporadas clave. Estás muy cerca de convertirte en una referencia local.'
        },
        {
          min: 8,
          max: 10,
          title: 'Experto en Península Valdés',
          description: 'Tu mirada ya está afinada para leer el mar, la estepa y la vida silvestre como un verdadero conocedor de Puerto Pirámides.'
        }
      ],
      ctas: {
        backHomeUrl: '/es/',
        excursionsUrl: '/es/#excursiones',
        availabilityUrl: '/es/reservas/'
      },
      questions: [
        {
          image: '/static/Imagenes/quiz/whale.webp',
          imageAlt: 'Ballena franca austral en Península Valdés.',
          prompt: '¿Qué especie es esta?',
          options: ['Ballena jorobada', 'Ballena franca austral', 'Ballena azul', 'Cachalote'],
          correctIndex: 1,
          explanation: 'La ballena franca austral visita Península Valdés todos los años entre junio y diciembre para reproducirse y tener sus crías.'
        },
        {
          image: '/static/Imagenes/quiz/orca.webp',
          imageAlt: 'Orca en la costa de Península Valdés.',
          prompt: '¿En qué zona de Península Valdés es más famoso el avistaje de orcas?',
          options: ['Golfo Nuevo', 'Punta Norte', 'Caleta Valdés', 'Puerto Madryn'],
          correctIndex: 1,
          explanation: 'En Punta Norte se pueden ver orcas cazando en la costa, un comportamiento único en el mundo.'
        },
        {
          image: '/static/Imagenes/quiz/penguins.webp',
          imageAlt: 'Pingüinos de Magallanes en la región.',
          prompt: '¿En qué época del año se pueden ver pingüinos en la región?',
          options: ['Junio a agosto', 'Todo el año', 'Septiembre a abril aproximadamente', 'Enero a marzo únicamente'],
          correctIndex: 2,
          explanation: 'Los pingüinos de Magallanes llegan en primavera para reproducirse y se quedan hasta el otoño.'
        },
        {
          image: '/static/Imagenes/quiz/elephant-seal.webp',
          imageAlt: 'Elefante marino sobre la costa patagónica.',
          prompt: '¿Qué animal es este?',
          options: ['Lobo marino', 'Foca leopardo', 'Elefante marino', 'León marino'],
          correctIndex: 2,
          explanation: 'El elefante marino es el pinnípedo más grande del mundo y los machos tienen una trompa característica.'
        },
        {
          image: '/static/Imagenes/quiz/sea-lion.webp',
          imageAlt: 'Lobo marino en Península Valdés.',
          prompt: '¿Cuál es la principal diferencia entre el lobo marino y el elefante marino?',
          options: ['El tipo de alimentación', 'El tamaño y la trompa del macho', 'La forma de nadar', 'La coloración del pelaje'],
          correctIndex: 1,
          explanation: 'Los elefantes marinos son mucho más grandes y los machos tienen una trompa inflable.'
        },
        {
          image: '/static/Imagenes/quiz/puerto-piramides.webp',
          imageAlt: 'Vista de Puerto Pirámides.',
          prompt: '¿Qué actividad es la más emblemática de Puerto Pirámides?',
          options: ['Buceo con lobos marinos', 'Avistaje embarcado de ballenas', 'Kayak con ballenas', 'Pesca deportiva'],
          correctIndex: 1,
          explanation: 'Puerto Pirámides es el único lugar de Argentina donde se realiza avistaje embarcado de ballenas.'
        },
        {
          image: '/static/Imagenes/quiz/guanacos.webp',
          imageAlt: 'Guanacos en la estepa patagónica.',
          prompt: 'Además de fauna marina, ¿qué otros animales podés ver en Península Valdés?',
          options: ['Guanacos, maras y zorros', 'Ciervos, pumas y osos', 'Alpacas y llamas', 'Ñandúes exclusivamente'],
          correctIndex: 0,
          explanation: 'La estepa patagónica está llena de fauna terrestre que también forma parte de la experiencia.'
        },
        {
          image: '/static/Imagenes/quiz/whale-calf.webp',
          imageAlt: 'Ballena franca austral con su cría.',
          prompt: '¿En qué meses suele ser más fuerte la temporada de ballenas?',
          options: ['Abril a julio', 'Junio a diciembre', 'Agosto a febrero', 'Octubre a marzo'],
          correctIndex: 1,
          explanation: 'La temporada comienza en junio y alcanza su punto más alto entre septiembre y octubre.'
        },
        {
          image: '/static/Imagenes/quiz/orca-jumping.webp',
          imageAlt: 'Orca saltando frente a la costa.',
          prompt: '¿Qué técnica de caza famosa utilizan las orcas en Península Valdés?',
          options: ['Caza cooperativa en aguas profundas', 'Varamiento intencional en la costa', 'Ataque desde el fondo marino', 'Emboscadas'],
          correctIndex: 1,
          explanation: 'Las orcas se varan intencionalmente para capturar crías de lobos marinos en la orilla.'
        },
        {
          image: '/static/Imagenes/quiz/elephant-seal-colony.webp',
          imageAlt: 'Colonia de elefantes marinos en la playa.',
          prompt: '¿Dónde se concentran grandes colonias de elefantes marinos?',
          options: ['Punta Norte', 'Caleta Valdés', 'Punta Delgada', 'Puerto Pirámides'],
          correctIndex: 1,
          explanation: 'Caleta Valdés es uno de los principales puntos para observar elefantes marinos.'
        },
        {
          image: '/static/Imagenes/quiz/steppe-landscape.webp',
          imageAlt: 'Paisaje de estepa patagónica.',
          prompt: '¿Cómo se llama el ecosistema predominante en la región?',
          options: ['Bosque', 'Estepa', 'Desierto', 'Tundra'],
          correctIndex: 1,
          explanation: 'La estepa patagónica es un ambiente árido con vegetación baja y fauna adaptada.'
        },
        {
          image: '/static/Imagenes/quiz/mara.webp',
          imageAlt: 'Mara patagónica.',
          prompt: '¿Qué animal es la mara?',
          options: ['Un pequeño marsupial', 'Un roedor de gran tamaño', 'Un conejo', 'Un tipo de zorro'],
          correctIndex: 1,
          explanation: 'La mara es un roedor grande típico de la Patagonia.'
        },
        {
          image: '/static/Imagenes/quiz/guanacos-herd.webp',
          imageAlt: 'Grupo de guanacos en la estepa.',
          prompt: '¿A qué familia pertenecen los guanacos?',
          options: ['Cérvidos', 'Camélidos', 'Bovinos', 'Marsupiales'],
          correctIndex: 1,
          explanation: 'Los guanacos son parientes de las llamas y vicuñas.'
        },
        {
          image: '/static/Imagenes/quiz/rocky-coast.webp',
          imageAlt: 'Costa rocosa y acantilados.',
          prompt: '¿Qué caracteriza las costas de Península Valdés?',
          options: ['Playas arenosas', 'Acantilados y playas de canto rodado', 'Costas selváticas densas', 'Glaciares costeros'],
          correctIndex: 1,
          explanation: 'La costa combina acantilados, restingas y playas de piedras.'
        },
        {
          image: '/static/Imagenes/quiz/whale-tail.webp',
          imageAlt: 'Ballena mostrando la cola fuera del agua.',
          prompt: '¿Qué comportamiento es común ver en las ballenas?',
          options: ['Permanecer inmóviles en superficie', 'Saltar y golpear el agua con la cola o aletas', 'Nadar en formaciones cerradas', 'Desplazarse fuera del agua'],
          correctIndex: 1,
          explanation: 'Las ballenas suelen golpear el agua con sus aletas o cola como forma de comunicación.'
        },
        {
          image: '/static/Imagenes/quiz/whale-watching-boat.webp',
          imageAlt: 'Turistas en una lancha de avistaje.',
          prompt: '¿Cómo se realiza el avistaje de ballenas en Puerto Pirámides?',
          options: ['Desde drones', 'En embarcaciones autorizadas', 'Desde autos', 'En submarinos turísticos'],
          correctIndex: 1,
          explanation: 'El avistaje se realiza con operadores habilitados en lanchas.'
        },
        {
          image: '/static/Imagenes/quiz/coast-sunset.webp',
          imageAlt: 'Atardecer en la costa.',
          prompt: '¿Qué hace especial a Puerto Pirámides además de la fauna?',
          options: ['Gran desarrollo urbano', 'Paisajes costeros y tranquilidad natural', 'Clima húmedo', 'Actividad salinera'],
          correctIndex: 1,
          explanation: 'Es un pueblo pequeño con naturaleza intacta y paisajes únicos.'
        },
        {
          image: '/static/Imagenes/quiz/punta-tombo.webp',
          imageAlt: 'Colonia de pingüinos en Punta Tombo.',
          prompt: '¿Dónde se encuentra una de las colonias más grandes de pingüinos cercanas?',
          options: ['Punta Tombo', 'Estancia San Lorenzo', 'Caleta Valdés', 'Isla Leones'],
          correctIndex: 0,
          explanation: 'Punta Tombo alberga una de las mayores colonias de pingüinos de Magallanes.'
        },
        {
          image: '/static/Imagenes/quiz/starry-sky.webp',
          imageAlt: 'Cielo estrellado en la zona.',
          prompt: '¿Qué característica natural destaca por la noche en la zona?',
          options: ['Alta nubosidad constante', 'Cielos despejados y muy estrellados', 'Auroras boreales frecuentes', 'Tormentas eléctricas'],
          correctIndex: 1,
          explanation: 'La baja contaminación lumínica permite ver cielos increíbles.'
        },
        {
          image: '/static/Imagenes/quiz/whale-calf-near-shore.webp',
          imageAlt: 'Ballena con cría cerca de la costa.',
          prompt: '¿Por qué las ballenas vienen a Península Valdés?',
          options: ['Para alimentarse exclusivamente', 'Para reproducirse y tener crías', 'Para migrar hacia el sur', 'Para evitar depredadores en mar abierto'],
          correctIndex: 1,
          explanation: 'Las aguas calmas son ideales para el nacimiento y cuidado de las crías.'
        }
      ]
    },
    en: {
      labels: {
        question: 'Question',
        of: 'of',
        score: 'Score',
        startBadge: '10 questions',
        startTitle: 'How much do you know about Península Valdés?',
        startSubtitle: 'A short journey through wildlife, seasons, and the landscapes that make this corner of Patagonia unique.',
        startButton: 'Start quiz',
        nextButton: 'Next',
        correct: 'Correct answer',
        incorrect: 'Incorrect answer',
        explanationTitle: 'Learn something new',
        playAgain: 'Play again',
        finalScore: 'Your result',
        scoreSummary: 'You got {score} out of {total} questions right.',
        backHome: 'Back to the site',
        viewExcursions: 'See excursions',
        checkAvailability: 'Check availability'
      },
      results: [
        {
          min: 0,
          max: 3,
          title: 'Beginner Explorer',
          description: 'You are just starting to uncover the secrets of the peninsula. Your next outing between sea and steppe will teach you a lot more.'
        },
        {
          min: 4,
          max: 7,
          title: 'Patagonia Lover',
          description: 'You already recognize much of the wildlife and the key seasons. You are very close to becoming a true local reference.'
        },
        {
          min: 8,
          max: 10,
          title: 'Península Valdés Expert',
          description: 'Your eye is already trained to read the sea, the steppe, and the wildlife like a true connoisseur of Puerto Pirámides.'
        }
      ],
      ctas: {
        backHomeUrl: '/en/',
        excursionsUrl: '/en/#excursions',
        availabilityUrl: '/en/booking/'
      },
      questions: [
        {
          image: '/static/Imagenes/quiz/whale.webp',
          imageAlt: 'Southern right whale in Península Valdés.',
          prompt: 'Which species is this?',
          options: ['Humpback whale', 'Southern right whale', 'Blue whale', 'Sperm whale'],
          correctIndex: 1,
          explanation: 'The southern right whale visits Península Valdés every year between June and December to breed and give birth.'
        },
        {
          image: '/static/Imagenes/quiz/orca.webp',
          imageAlt: 'Orca near the coast of Península Valdés.',
          prompt: 'In which area of Península Valdés is orca watching most famous?',
          options: ['Golfo Nuevo', 'Punta Norte', 'Caleta Valdés', 'Puerto Madryn'],
          correctIndex: 1,
          explanation: 'At Punta Norte you can sometimes see orcas hunting close to shore, a behavior that is unique in the world.'
        },
        {
          image: '/static/Imagenes/quiz/penguins.webp',
          imageAlt: 'Magellanic penguins in the region.',
          prompt: 'At what time of year can penguins be seen in the region?',
          options: ['June to August', 'All year round', 'Roughly September to April', 'January to March only'],
          correctIndex: 2,
          explanation: 'Magellanic penguins arrive in spring to breed and stay until autumn.'
        },
        {
          image: '/static/Imagenes/quiz/elephant-seal.webp',
          imageAlt: 'Elephant seal on the Patagonian coast.',
          prompt: 'What animal is this?',
          options: ['Sea lion', 'Leopard seal', 'Elephant seal', 'Fur seal'],
          correctIndex: 2,
          explanation: 'The elephant seal is the largest pinniped in the world, and adult males have a distinctive trunk-like nose.'
        },
        {
          image: '/static/Imagenes/quiz/sea-lion.webp',
          imageAlt: 'Sea lion in Península Valdés.',
          prompt: 'What is the main difference between a sea lion and an elephant seal?',
          options: ['Its diet', 'The size and the male trunk', 'The way it swims', 'The color of its coat'],
          correctIndex: 1,
          explanation: 'Elephant seals are much larger, and the males have an inflatable trunk.'
        },
        {
          image: '/static/Imagenes/quiz/puerto-piramides.webp',
          imageAlt: 'View of Puerto Pirámides.',
          prompt: 'Which activity is the most iconic in Puerto Pirámides?',
          options: ['Diving with sea lions', 'Boat-based whale watching', 'Kayaking with whales', 'Sport fishing'],
          correctIndex: 1,
          explanation: 'Puerto Pirámides is the only place in Argentina where boat-based whale watching takes place.'
        },
        {
          image: '/static/Imagenes/quiz/guanacos.webp',
          imageAlt: 'Guanacos on the Patagonian steppe.',
          prompt: 'Besides marine wildlife, what other animals can you see in Península Valdés?',
          options: ['Guanacos, maras, and foxes', 'Deer, pumas, and bears', 'Alpacas and llamas', 'Rheas only'],
          correctIndex: 0,
          explanation: 'The Patagonian steppe is full of land animals that are also part of the experience.'
        },
        {
          image: '/static/Imagenes/quiz/whale-calf.webp',
          imageAlt: 'Southern right whale with calf.',
          prompt: 'During which months is whale season usually strongest?',
          options: ['April to July', 'June to December', 'August to February', 'October to March'],
          correctIndex: 1,
          explanation: 'The season starts in June and reaches its peak between September and October.'
        },
        {
          image: '/static/Imagenes/quiz/orca-jumping.webp',
          imageAlt: 'Breaching orca near the coast.',
          prompt: 'What famous hunting technique do orcas use in Península Valdés?',
          options: ['Cooperative hunting in deep waters', 'Intentional stranding on the shore', 'Attack from the seafloor', 'Ambushes'],
          correctIndex: 1,
          explanation: 'Orcas intentionally strand themselves to catch sea lion pups close to the shoreline.'
        },
        {
          image: '/static/Imagenes/quiz/elephant-seal-colony.webp',
          imageAlt: 'Elephant seals gathered on the beach.',
          prompt: 'Where do large elephant seal colonies gather?',
          options: ['Punta Norte', 'Caleta Valdés', 'Punta Delgada', 'Puerto Pirámides'],
          correctIndex: 1,
          explanation: 'Caleta Valdés is one of the main places to observe elephant seals.'
        },
        {
          image: '/static/Imagenes/quiz/steppe-landscape.webp',
          imageAlt: 'Patagonian steppe landscape.',
          prompt: 'What is the main ecosystem in the region called?',
          options: ['Forest', 'Steppe', 'Desert', 'Tundra'],
          correctIndex: 1,
          explanation: 'The Patagonian steppe is an arid environment with low vegetation and highly adapted wildlife.'
        },
        {
          image: '/static/Imagenes/quiz/mara.webp',
          imageAlt: 'Patagonian mara.',
          prompt: 'What kind of animal is a mara?',
          options: ['A small marsupial', 'A large rodent', 'A rabbit', 'A type of fox'],
          correctIndex: 1,
          explanation: 'The mara is a large rodent native to Patagonia.'
        },
        {
          image: '/static/Imagenes/quiz/guanacos-herd.webp',
          imageAlt: 'Guanaco herd on the steppe.',
          prompt: 'Which family do guanacos belong to?',
          options: ['Deer', 'Camelids', 'Bovines', 'Marsupials'],
          correctIndex: 1,
          explanation: 'Guanacos are relatives of llamas and vicuñas.'
        },
        {
          image: '/static/Imagenes/quiz/rocky-coast.webp',
          imageAlt: 'Rocky coastline and cliffs.',
          prompt: 'What characterizes the coasts of Península Valdés?',
          options: ['Sandy beaches', 'Cliffs and pebble beaches', 'Dense jungle coastline', 'Coastal glaciers'],
          correctIndex: 1,
          explanation: 'The coastline combines cliffs, rocky platforms, and pebble beaches.'
        },
        {
          image: '/static/Imagenes/quiz/whale-tail.webp',
          imageAlt: 'Whale lifting its tail out of the water.',
          prompt: 'What behavior is common to see in whales?',
          options: ['Remaining motionless at the surface', 'Jumping and slapping the water with the tail or fins', 'Swimming in tight formations', 'Moving out of the water'],
          correctIndex: 1,
          explanation: 'Whales often slap the water with their fins or tails as a form of communication.'
        },
        {
          image: '/static/Imagenes/quiz/whale-watching-boat.webp',
          imageAlt: 'Tourists on an authorized whale-watching boat.',
          prompt: 'How is whale watching done in Puerto Pirámides?',
          options: ['From drones', 'On authorized boats', 'From cars', 'In tourist submarines'],
          correctIndex: 1,
          explanation: 'Whale watching is carried out by licensed operators in small boats.'
        },
        {
          image: '/static/Imagenes/quiz/coast-sunset.webp',
          imageAlt: 'Sunset on the coast.',
          prompt: 'What makes Puerto Pirámides special besides its wildlife?',
          options: ['Major urban development', 'Coastal landscapes and natural calm', 'Humid climate', 'Salt-extraction activity'],
          correctIndex: 1,
          explanation: 'It is a small town with unspoiled nature, silence, and distinctive coastal scenery.'
        },
        {
          image: '/static/Imagenes/quiz/punta-tombo.webp',
          imageAlt: 'Penguin colony at Punta Tombo.',
          prompt: 'Where is one of the largest nearby penguin colonies located?',
          options: ['Punta Tombo', 'Estancia San Lorenzo', 'Caleta Valdés', 'Isla Leones'],
          correctIndex: 0,
          explanation: 'Punta Tombo is home to one of the largest Magellanic penguin colonies.'
        },
        {
          image: '/static/Imagenes/quiz/starry-sky.webp',
          imageAlt: 'Starry night sky.',
          prompt: 'What natural feature stands out at night in the area?',
          options: ['Constant heavy cloud cover', 'Clear, very starry skies', 'Frequent northern lights', 'Thunderstorms'],
          correctIndex: 1,
          explanation: 'Low light pollution makes it possible to enjoy remarkable night skies.'
        },
        {
          image: '/static/Imagenes/quiz/whale-calf-near-shore.webp',
          imageAlt: 'Whale and calf near the shore.',
          prompt: 'Why do whales come to Península Valdés?',
          options: ['To feed exclusively', 'To breed and have calves', 'To migrate south', 'To avoid predators in the open sea'],
          correctIndex: 1,
          explanation: 'These calm waters are ideal for giving birth and caring for newborn calves.'
        }
      ]
    }
  };

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }
    callback();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatLabel(template, replacements) {
    return template.replace(/\{(\w+)\}/g, function (_, key) {
      return replacements[key];
    });
  }

  function getResult(content, score) {
    return content.results.find(function (result) {
      return score >= result.min && score <= result.max;
    }) || content.results[content.results.length - 1];
  }

  function createQuestionOrder(total, limit) {
    var order = [];
    var index;

    for (index = 0; index < total; index += 1) {
      order.push(index);
    }

    for (index = order.length - 1; index > 0; index -= 1) {
      var swapIndex = Math.floor(Math.random() * (index + 1));
      var currentValue = order[index];
      order[index] = order[swapIndex];
      order[swapIndex] = currentValue;
    }

    return order.slice(0, Math.min(limit, total));
  }

  function preloadImage(state, src) {
    if (!src) {
      return;
    }

    if (state.preloadedImages[src]) {
      return;
    }

    state.preloadedImages[src] = true;
    var image = new Image();
    image.decoding = 'async';
    image.src = src;
  }

  function preloadUpcomingImages(content, state) {
    var indexesToWarm = [state.currentIndex, state.currentIndex + 1, state.currentIndex + 2];

    indexesToWarm.forEach(function (orderIndex) {
      if (orderIndex < 0 || orderIndex >= state.questionOrder.length) {
        return;
      }

      var questionIndex = state.questionOrder[orderIndex];
      var question = content.questions[questionIndex];
      preloadImage(state, question.image);
    });
  }

  function renderStart(root, content, state) {
    root.innerHTML = [
      '<div class="quiz-screen quiz-screen--start">',
      '  <div class="quiz-screen__intro">',
      '    <span class="quiz-badge">' + escapeHtml(content.labels.startBadge) + '</span>',
      '    <h2>' + escapeHtml(content.labels.startTitle) + '</h2>',
      '    <p>' + escapeHtml(content.labels.startSubtitle) + '</p>',
      '  </div>',
      '  <div class="quiz-screen__actions">',
      '    <button type="button" class="btn btn-primary" data-quiz-start>' + escapeHtml(content.labels.startButton) + '</button>',
      '  </div>',
      '</div>'
    ].join('');

    root.querySelector('[data-quiz-start]').addEventListener('click', function () {
      state.currentIndex = 0;
      state.score = 0;
      state.answered = false;
      state.questionOrder = createQuestionOrder(content.questions.length, QUESTIONS_PER_GAME);
      preloadUpcomingImages(content, state);
      renderQuestion(root, content, state);
    });
  }

  function renderQuestion(root, content, state) {
    var questionIndex = state.questionOrder[state.currentIndex];
    var question = content.questions[questionIndex];
    var total = state.questionOrder.length;
    var progress = ((state.currentIndex + 1) / total) * 100;

    preloadUpcomingImages(content, state);

    root.innerHTML = [
      '<div class="quiz-screen quiz-screen--question">',
      '  <div class="quiz-card__meta">',
      '    <span class="quiz-badge">' + escapeHtml(content.labels.question) + ' ' + (state.currentIndex + 1) + ' ' + escapeHtml(content.labels.of) + ' ' + total + '</span>',
      '    <span class="quiz-badge quiz-badge--secondary" data-score-live>' + escapeHtml(content.labels.score) + ': ' + state.score + '</span>',
      '  </div>',
      '  <div class="quiz-progress" aria-hidden="true"><span style="width:' + progress + '%"></span></div>',
      '  <figure class="quiz-card__media">',
      '    <img src="' + escapeHtml(question.image) + '" alt="' + escapeHtml(question.imageAlt) + '" loading="eager" decoding="async">',
      '  </figure>',
      '  <div class="quiz-card__body">',
      '    <h2>' + escapeHtml(question.prompt) + '</h2>',
      '    <div class="quiz-options" role="list">',
             question.options.map(function (option, index) {
               return '<button type="button" class="quiz-option" data-option="' + index + '" role="listitem">' + escapeHtml(option) + '</button>';
             }).join(''),
      '    </div>',
      '    <div class="quiz-feedback" data-feedback hidden aria-live="polite">',
      '      <div class="quiz-feedback__label" data-feedback-label></div>',
      '      <h3>' + escapeHtml(content.labels.explanationTitle) + '</h3>',
      '      <p data-feedback-copy></p>',
      '      <button type="button" class="btn btn-primary" data-next-button>' + escapeHtml(content.labels.nextButton) + '</button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');

    var optionButtons = root.querySelectorAll('[data-option]');
    var feedback = root.querySelector('[data-feedback]');
    var feedbackLabel = root.querySelector('[data-feedback-label]');
    var feedbackCopy = root.querySelector('[data-feedback-copy]');
    var nextButton = root.querySelector('[data-next-button]');
    var scoreLive = root.querySelector('[data-score-live]');

    optionButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (state.answered) {
          return;
        }

        state.answered = true;
        var selectedIndex = Number(button.getAttribute('data-option'));
        var isCorrect = selectedIndex === question.correctIndex;

        if (isCorrect) {
          state.score += 1;
          scoreLive.textContent = content.labels.score + ': ' + state.score;
        }

        optionButtons.forEach(function (optionButton, index) {
          optionButton.disabled = true;

          if (index === question.correctIndex) {
            optionButton.classList.add('is-correct');
            return;
          }

          if (index === selectedIndex && !isCorrect) {
            optionButton.classList.add('is-incorrect');
            return;
          }

          optionButton.classList.add('is-muted');
        });

        feedback.hidden = false;
        feedback.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
        feedbackLabel.textContent = isCorrect ? content.labels.correct : content.labels.incorrect;
        feedbackCopy.textContent = question.explanation;
      });
    });

    nextButton.addEventListener('click', function () {
      state.currentIndex += 1;
      state.answered = false;

      if (state.currentIndex >= total) {
        renderResult(root, content, state);
        return;
      }

      renderQuestion(root, content, state);
    });
  }

  function renderResult(root, content, state) {
    var total = state.questionOrder.length;
    var result = getResult(content, state.score);
    var scoreSummary = formatLabel(content.labels.scoreSummary, {
      score: state.score,
      total: total
    });

    root.innerHTML = [
      '<div class="quiz-screen quiz-screen--result">',
      '  <span class="quiz-badge">' + escapeHtml(content.labels.finalScore) + '</span>',
      '  <div class="quiz-result__score">' + state.score + '/' + total + '</div>',
      '  <h2>' + escapeHtml(result.title) + '</h2>',
      '  <p class="quiz-result__summary">' + escapeHtml(scoreSummary) + '</p>',
      '  <p class="quiz-result__description">' + escapeHtml(result.description) + '</p>',
      '  <div class="quiz-result__actions">',
      '    <a class="btn btn-primary" href="' + escapeHtml(content.ctas.backHomeUrl) + '">' + escapeHtml(content.labels.backHome) + '</a>',
      '    <a class="btn btn-ghost" href="' + escapeHtml(content.ctas.excursionsUrl) + '">' + escapeHtml(content.labels.viewExcursions) + '</a>',
      '    <a class="btn btn-ghost" href="' + escapeHtml(content.ctas.availabilityUrl) + '">' + escapeHtml(content.labels.checkAvailability) + '</a>',
      '    <button type="button" class="btn btn-ghost" data-play-again>' + escapeHtml(content.labels.playAgain) + '</button>',
      '  </div>',
      '</div>'
    ].join('');

    root.querySelector('[data-play-again]').addEventListener('click', function () {
      state.currentIndex = -1;
      state.score = 0;
      state.answered = false;
      renderStart(root, content, state);
    });
  }

  ready(function () {
    var root = document.querySelector('[data-quiz-app]');
    if (!root) {
      return;
    }

    var lang = root.getAttribute('data-quiz-lang') || document.documentElement.getAttribute('lang') || 'es';
    var content = QUIZ_CONTENT[lang] || QUIZ_CONTENT.es;
    var state = {
      currentIndex: -1,
      score: 0,
      answered: false,
      questionOrder: [],
      preloadedImages: {}
    };

    renderStart(root, content, state);
  });
})();
