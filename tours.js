// Curated tours: a named set of stops, in walking order, with its own page
// at /tours/<id>/ (src/app/09c-tour-page.js in the app; scripts/build-pages.js
// for the static page). Each stop id must exist in data.js.
//
// Text is HTML, like data.js: use &rsquo; &ndash; &mdash; for curly quotes
// and dashes.
var TOURS = [
  {
    id: 'beer-mile',
    name: 'The Beer Mile',
    area: 'bermondsey',
    intro: 'Bermondsey&rsquo;s railway arches, a short walk from London Bridge, hold one of the densest clusters of breweries and taprooms in Britain. It began when the Kernel started brewing on Druid Street in 2010; others followed into the arches along Druid Street, Stanworth Street and Enid Street. This tour takes in the breweries still pouring, from Southwark Brewing at the London Bridge end out to the Kernel. Most taprooms open only on certain days, so check before you go.',
    stops: [
      'southwark-brewing',
      'kanpai-london',
      'hiver-beers',
      'anspach-and-hobday',
      'cloudwater-bermondsey',
      'bianca-road-brewery',
      'kernel-brewery'
    ]
  }
];
