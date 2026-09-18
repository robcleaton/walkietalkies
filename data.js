  var STOPS = [
    { id:'royal-observatory', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Royal_observatory_greenwich.jpg/330px-Royal_observatory_greenwich.jpg', name:'Royal Observatory', area:'Greenwich Park', pc:'SE10', cat:'works', year:1675, era:'Founded 1675',
      lat:51.4769, lon:-0.0005, addr:'Blackheath Avenue, SE10 8XJ',
      text:'Charles II founded it in 1675 &ldquo;for perfecting navigation and astronomy&rdquo; &mdash; a working observatory whose real job was to fix longitude at sea. Flamsteed House, its first building, was Wren&rsquo;s only completed observatory.\n\nThe red time ball on the turret has dropped at exactly 13:00 since 1833, so ships in the Pool of London could set their chronometers by it.' },

    { id:'cutty-sark', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Northeast_View_of_the_Cutty_Sark_in_Greenwich.jpg/330px-Northeast_View_of_the_Cutty_Sark_in_Greenwich.jpg', name:'Cutty Sark', area:'Greenwich', pc:'SE10', cat:'maritime', year:1869, era:'Launched 1869',
      lat:51.4826, lon:-0.0096, addr:'King William Walk, SE10 9HT',
      text:'Built at Dumbarton for the China tea run, then made her real money hauling Australian wool. She is the last intact composite clipper anywhere &mdash; an iron frame under a teak and rock elm skin.\n\nNamed for the short shift worn by the witch Nannie in Burns&rsquo;s Tam o&rsquo; Shanter. The figurehead still reaches out for the grey mare&rsquo;s tail.' },

    { id:'painted-hall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Royal_Naval_College_Greenwich_view_from_the_Thames.jpg/330px-Royal_Naval_College_Greenwich_view_from_the_Thames.jpg', name:'The Painted Hall', area:'Old Royal Naval College', pc:'SE10', cat:'culture', year:1707, era:'Painted 1707&ndash;1726',
      lat:51.4834, lon:-0.0075, addr:'Old Royal Naval College, SE10 9NN',
      text:'James Thornhill spent nineteen years covering the ceiling and walls of what was built as a dining room for naval pensioners. The pensioners were moved out and charged the public to see it instead.\n\nThornhill was paid &pound;3 a square yard for the ceiling and &pound;1 for the walls. He painted himself into the west wall, hand extended for the fee.' },

    { id:'queens-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Queens_House.jpg/330px-Queens_House.jpg', name:'Queen&rsquo;s House', area:'Greenwich', pc:'SE10', cat:'grand', year:1616, era:'Built 1616&ndash;1635',
      lat:51.481, lon:-0.0059, addr:'Romney Road, SE10 9NF',
      text:'Inigo Jones began it for Anne of Denmark and finished it for Henrietta Maria &mdash; the first consciously classical building in England, and a genuine shock in a city of gables and jetties.\n\nThe Tulip Stairs are Britain&rsquo;s first geometric self-supporting spiral staircase: no central column, each tread carried by the one below.' },

    { id:'rangers-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/EH1218679_The_Ranger%27s_House.JPG/330px-EH1218679_The_Ranger%27s_House.JPG', name:'Ranger&rsquo;s House', area:'Blackheath edge', pc:'SE10', cat:'culture', year:1723, era:'Built c.1723',
      lat:51.4712, lon:-0.0038, addr:'Chesterfield Walk, SE10 8QX',
      text:'A plain red-brick Georgian villa on the western lip of Greenwich Park, now holding the art collection Julius Wernher assembled out of Kimberley diamond money.\n\nAmong the 700-odd pieces: Renaissance bronzes, medieval reliquaries, and a jewelled memento mori pendant in the shape of a skull.' },

    { id:'wolfe-macartney', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Macartney_House%2C_Greenwich_%2801%29.jpg/330px-Macartney_House%2C_Greenwich_%2801%29.jpg', name:'General Wolfe &amp; Macartney House', area:'Chesterfield Walk', pc:'SE10', cat:'plaque', year:1759, era:'Family home to 1759',
      lat:51.4738, lon:-0.0043, addr:'Chesterfield Walk, SE10 8QY',
      text:'Macartney House was the Wolfe family home. James Wolfe left it in 1759 for the St Lawrence and Quebec, and came back to it in a coffin the following year.\n\nHis statue on the crown of the hill above &mdash; a gift from the people of Canada in 1930 &mdash; still carries the shrapnel scars it took in the Blitz.' },

    { id:'vanbrugh-castle', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Vanbrugh_Castle.jpg/330px-Vanbrugh_Castle.jpg', name:'Vanbrugh Castle', area:'Maze Hill', pc:'SE10', cat:'grand', year:1719, era:'Built 1719',
      lat:51.4795, lon:0.0053, addr:'Maze Hill, SE10 8XD &mdash; private, view from the road',
      text:'Sir John Vanbrugh &mdash; Restoration playwright turned architect of Blenheim &mdash; built himself a mock-medieval house of brick towers and battlements on the hill above Greenwich.\n\nLocals called it the Bastille House. Vanbrugh had been imprisoned in the real Bastille as a young man and seems to have liked the silhouette enough to live in it.' },

    { id:'marlowe-deptford', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg/330px-Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg', name:'Marlowe&rsquo;s grave, St Nicholas', area:'Deptford Green', pc:'SE8', cat:'memory', year:1593, era:'Buried 1 June 1593',
      lat:51.4839, lon:-0.0264, addr:'Deptford Green, SE8 3DQ',
      text:'Christopher Marlowe was stabbed above the right eye in a Deptford lodging house on 30 May 1593, over a disputed bill, and buried here two days later in an unmarked grave.\n\nThe two stone skulls on the churchyard gate piers are the parish&rsquo;s emblem &mdash; and, by long local tradition, the origin of the Jolly Roger.' },

    { id:'sayes-court', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Sayes_Court.jpg/330px-Sayes_Court.jpg', name:'Sayes Court Park', area:'Deptford', pc:'SE8', cat:'green', year:1653, era:'Laid out from 1653',
      lat:51.4855, lon:-0.0285, addr:'Sayes Court Street, SE8 5DE',
      text:'A small municipal park that is all that survives of John Evelyn&rsquo;s garden &mdash; in its day one of the most influential in England, and the seedbed of his forestry treatise Sylva.\n\nEvelyn let the house to Peter the Great in 1698. The Tsar reportedly entertained himself by being pushed through the prized holly hedge in a wheelbarrow.' },

    { id:'deptford-dockyard', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg/330px-Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg', name:'Deptford Royal Dockyard', area:'Convoys Wharf', pc:'SE8', cat:'maritime', year:1513, era:'Founded 1513',
      lat:51.4867, lon:-0.03, addr:'Prince Street, SE8 3JD',
      text:'Henry VIII&rsquo;s dockyard, where the navy was built, victualled and repaired for three and a half centuries before the river silted and the yards moved downstream.\n\nElizabeth I came here in April 1581 to knight Francis Drake aboard the Golden Hind, newly back from circling the world.' },

    { id:'charlton-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Charlton_House_01.jpg/330px-Charlton_House_01.jpg', name:'Charlton House', area:'Charlton', pc:'SE7', cat:'grand', year:1607, era:'Built 1607&ndash;1612',
      lat:51.4818, lon:0.0338, addr:'Charlton Road, SE7 8RE',
      text:'Built for Adam Newton, tutor to Prince Henry, and scarcely altered since &mdash; the most complete Jacobean house left in London, down to the plaster ceilings.\n\nThe mulberry in the grounds is said to have been planted in 1608, part of James I&rsquo;s scheme to found an English silk industry. He ordered the wrong species.' },

    { id:'severndroog', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/2016_Severndroog_Castle_02.jpg/330px-2016_Severndroog_Castle_02.jpg', name:'Severndroog Castle', area:'Shooter&rsquo;s Hill', pc:'SE18', cat:'grand', year:1784, era:'Built 1784',
      lat:51.468, lon:0.0631, addr:'Castle Wood, Shooter&rsquo;s Hill, SE18 3RT',
      text:'A triangular Gothic folly tower raised by Lady James in memory of her husband, who took the fortress of Suvarnadurg on the Konkan coast in 1755.\n\nFrom the viewing platform, on the right morning, you can see across seven counties &mdash; roughly sixty miles of horizon from one of the highest points in London.' },

    { id:'royal-arsenal', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Woolwich_royal_arsenal_gatehouse_1.jpg/330px-Woolwich_royal_arsenal_gatehouse_1.jpg', name:'Royal Arsenal', area:'Woolwich', pc:'SE18', cat:'works', year:1671, era:'From 1671',
      lat:51.4923, lon:0.07, addr:'Dial Arch Square, SE18 6GH',
      text:'Gunpowder, shot and shell for the British Army across three centuries. At its Great War peak the site ran three miles along the river and employed close to 80,000 people.\n\nThe works football team, formed by munitions men in 1886 and named Dial Square after their workshop, became Woolwich Arsenal &mdash; then simply Arsenal.' },

    { id:'woolwich-ferry', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Woolwich_Ferry_from_the_Southeast_%2801%29.jpg/330px-Woolwich_Ferry_from_the_Southeast_%2801%29.jpg', name:'Woolwich Free Ferry', area:'Woolwich', pc:'SE18', cat:'maritime', year:1889, era:'Opened 1889',
      lat:51.497, lon:0.068, addr:'New Ferry Approach, SE18 6DX',
      text:'Free when it opened in 1889 and free now &mdash; the crossing was granted to the people of Woolwich in perpetuity, and no government has yet dared to charge for it.\n\nThe foot tunnel beside it, opened in 1912, is 504 metres of white glazed tile running under the river bed.' },

    { id:'eltham-palace', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Eltham_Palace-8242930494.jpg/330px-Eltham_Palace-8242930494.jpg', name:'Eltham Palace', area:'Eltham', pc:'SE9', cat:'grand', year:1470, era:'1470s &amp; 1936',
      lat:51.4485, lon:0.0523, addr:'Court Yard, SE9 5QE',
      text:'Edward IV&rsquo;s great hall, carrying the third-largest hammerbeam roof in England, bolted onto an Art Deco house built for Stephen and Virginia Courtauld in 1936. It should not work. It does.\n\nThe Courtaulds&rsquo; pet ring-tailed lemur, Mah-Jongg, had his own centrally heated quarters upstairs, reached by a bamboo ladder.' },

    { id:'well-hall', img:'https://upload.wikimedia.org/wikipedia/commons/4/4b/Nesbit.jpg', name:'E. Nesbit at Well Hall', area:'Eltham', pc:'SE9', cat:'plaque', year:1899, era:'Lived here 1899&ndash;1922',
      lat:51.456, lon:0.0508, addr:'Well Hall Pleasaunce, SE9 6SZ',
      text:'Edith Nesbit wrote The Railway Children and Five Children and It while living at Well Hall House. The house is gone; the moated garden survives as a public park.\n\nThe Tudor barn in the grounds is the last building of the estate once held by Margaret Roper &mdash; Thomas More&rsquo;s daughter, who is said to have brought his head here.' },

    { id:'stephen-lawrence', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Well_Hall_Road%2C_SE9_-_geograph.org.uk_-_229103.jpg/330px-Well_Hall_Road%2C_SE9_-_geograph.org.uk_-_229103.jpg', name:'Stephen Lawrence memorial', area:'Well Hall Road', pc:'SE9', cat:'memory', year:1993, era:'22 April 1993',
      lat:51.4552, lon:0.05, addr:'Well Hall Road, SE9 6SN',
      text:'A plaque set flat into the pavement marks the spot where Stephen Lawrence, eighteen years old, was murdered on 22 April 1993 while waiting for a bus home.\n\nThe Macpherson report of 1999 followed from his family&rsquo;s campaign. It named institutional racism in the Metropolitan Police and led to the end of the double jeopardy rule.' },

    { id:'barlow-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/7/74/John_Collier_-_William_Henry_Barlow.jpg', name:'William Henry Barlow', area:'Charlton', pc:'SE7', cat:'plaque', year:1812, era:'Blue plaque',
      lat:51.4799, lon:0.0274, addr:'145 Charlton Road, SE7 7EZ',
      text:'Barlow engineered the Midland Railway&rsquo;s London extension and designed its cathedral-like terminus at St Pancras, its single span then the widest roof in the world.\n\nHe also completed Brunel&rsquo;s unfinished Clifton Suspension Bridge after Brunel&rsquo;s death in 1859, working alongside fellow engineer John Hawkshaw.' },

    { id:'day-lewis-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/1968_press_photo_of_Cecil_Day-Lewis.jpg/330px-1968_press_photo_of_Cecil_Day-Lewis.jpg', name:'Cecil Day-Lewis', area:'Greenwich', pc:'SE10', cat:'plaque', year:1904, era:'Blue plaque',
      lat:51.4775, lon:-0.0075, addr:'6 Croom&rsquo;s Hill, SE10 8HL',
      text:'Day-Lewis was Poet Laureate from 1968 until his death in 1972, and lived on Croom&rsquo;s Hill for the last years of his life.\n\nHe moonlighted for decades as crime writer Nicholas Blake, publishing detective novels under the pseudonym while keeping his poetry and his thrillers carefully separate.' },

    { id:'dyson-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Frank_Watson_Dyson.jpg/330px-Frank_Watson_Dyson.jpg', name:'Sir Frank Dyson', area:'Blackheath', pc:'SE3', cat:'plaque', year:1868, era:'Blue plaque',
      lat:51.4808, lon:0.0086, addr:'6 Vanbrugh Hill, SE3 7UF',
      text:'As Astronomer Royal, Dyson introduced the Greenwich time signal &mdash; the BBC&rsquo;s &ldquo;six pips&rdquo; &mdash; to national radio in 1924.\n\nHe also organised the 1919 eclipse expeditions that measured starlight bending around the sun, the observation that first confirmed Einstein&rsquo;s general relativity.' },

    { id:'eddington-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Arthur_Stanley_Eddington.jpg/330px-Arthur_Stanley_Eddington.jpg', name:'Sir Arthur Eddington', area:'Blackheath', pc:'SE3', cat:'plaque', year:1882, era:'Blue plaque',
      lat:51.4653, lon:0.0099, addr:'4 Bennett Park, SE3 9RB',
      text:'Eddington led one of the 1919 eclipse expeditions &mdash; the one that made him famous overnight for confirming Einstein &mdash; and later foreshadowed the discovery of nuclear fusion in stars.\n\nAsked if he was one of only three people in the world who understood general relativity, he reportedly paused for a long moment and said he was trying to think who the third person was.' },

    { id:'gpo-film-unit-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/GPO_Film_Unit_-_47_Bennett_Park_Blackheath_SE3_-_2.jpg/330px-GPO_Film_Unit_-_47_Bennett_Park_Blackheath_SE3_-_2.jpg', name:'GPO Film Unit', area:'Blackheath', pc:'SE3', cat:'plaque', year:1933, era:'Blue plaque',
      lat:51.4657, lon:0.0125, addr:'47 Bennett Park, SE3 9RA',
      text:'The GPO Film Unit, based partly at this address under John Grierson, turned sponsored documentaries about the Post Office into a training ground for British cinema.\n\nIts 1936 short Night Mail set verse by W. H. Auden to a score by Benjamin Britten &mdash; unlikely treatment for a film about a mail train.' },

    { id:'gounod-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Charles_Gounod_-_photogr._Bayard_%26_Bertall_-_btv1b84542916.jpg/330px-Charles_Gounod_-_photogr._Bayard_%26_Bertall_-_btv1b84542916.jpg', name:'Charles Gounod', area:'Blackheath', pc:'SE3', cat:'plaque', year:1870, era:'Blue plaque',
      lat:51.4677, lon:0.0191, addr:'15 Morden Road, SE3 0AA',
      text:'Gounod, composer of Faust, fled to London in 1870 when the Franco-Prussian War reached Paris, and stayed in Blackheath for several years.\n\nHe conducted his own choral society from here, writing religious music in England before eventually returning to France.' },

    { id:'hawthorne-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nathaniel_Hawthorne_by_Brady%2C_1860-64.jpg/330px-Nathaniel_Hawthorne_by_Brady%2C_1860-64.jpg', name:'Nathaniel Hawthorne', area:'Blackheath', pc:'SE3', cat:'plaque', year:1804, era:'Blue plaque',
      lat:51.4656, lon:0.0138, addr:'4 Pond Road, SE3 9JL',
      text:'The Scarlet Letter&rsquo;s author stayed on Pond Road in 1856 while serving as US consul in Liverpool, using visits to London to escape the port city.\n\nHis notebooks from these years were later published as Our Old Home &mdash; a mixed, sometimes prickly account of England from a writer better known for praising it in public than in private.' },

    { id:'lindley-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/William_Lindley.jpg/330px-William_Lindley.jpg', name:'William Lindley &amp; Sir William Heerlein Lindley', area:'Blackheath', pc:'SE3', cat:'plaque', year:1808, era:'Blue plaque',
      lat:51.4744, lon:0.0235, addr:'74 Shooters Hill, SE3 7BG',
      text:'Father and son engineered water and sewerage systems for more than thirty cities across Europe, from Hamburg to Warsaw to St Petersburg &mdash; work mostly never seen in Britain at all.\n\nWilliam senior&rsquo;s Hamburg waterworks were credited with helping the city dodge cholera outbreaks that repeatedly devastated less well-drained European ports.' },

    { id:'morrison-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Herbert_Morrison_1947_%28cropped%29.jpg/330px-Herbert_Morrison_1947_%28cropped%29.jpg', name:'Herbert Morrison', area:'Eltham', pc:'SE9', cat:'plaque', year:1888, era:'Blue plaque',
      lat:51.4541, lon:0.0551, addr:'55 Archery Road, SE9 1HF',
      text:'Morrison led the London County Council through the 1930s and went on to serve as Home Secretary and Foreign Secretary in successive Labour governments.\n\nHis grandson, Peter Mandelson, became a Cabinet minister and EU Commissioner two generations later &mdash; front-bench politics running in the family on an unusual scale.' },

    { id:'chesterfield-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Philip_Dormer_Stanhope%2C_4th_Earl_of_Chesterfield_by_Allan_Ramsay.jpg/330px-Philip_Dormer_Stanhope%2C_4th_Earl_of_Chesterfield_by_Allan_Ramsay.jpg', name:'Philip Stanhope, 4th Earl of Chesterfield', area:'Ranger&rsquo;s House, Chesterfield Walk', pc:'SE10', cat:'plaque', year:1694, era:'Blue plaque, 1937',
      lat:51.4734, lon:-0.0016, addr:'Ranger&rsquo;s House, Chesterfield Walk, SE10 8QX',
      text:'Chesterfield, the statesman and letter-writing wit, lived in what is now Ranger&rsquo;s House from 1748 &mdash; over a century before the Georgian villa took the job title it&rsquo;s known by today.\n\nThe London County Council put up two separate plaques on this one building in 1937, his and Field Marshal Wolseley&rsquo;s, for two residents a hundred and forty years apart.' },

    { id:'wolseley-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Garnet_Joseph_Wolseley%2C_1st_Viscount_Wolseley_by_William_Lawrence.jpg/330px-Garnet_Joseph_Wolseley%2C_1st_Viscount_Wolseley_by_William_Lawrence.jpg', name:'Garnet Wolseley, 1st Viscount Wolseley', area:'Ranger&rsquo;s House, Chesterfield Walk', pc:'SE10', cat:'plaque', year:1833, era:'Blue plaque, 1937',
      lat:51.4734, lon:-0.0016, addr:'Ranger&rsquo;s House, Chesterfield Walk, SE10 8QX',
      text:'Wolseley moved into Ranger&rsquo;s House in 1888 at Queen Victoria&rsquo;s invitation, by then the most decorated general in the British Army after campaigns in Canada, West Africa and Egypt.\n\nHis reputation for brisk efficiency made him the model for Gilbert and Sullivan&rsquo;s &ldquo;modern Major-General&rdquo; in The Pirates of Penzance, a joke he reportedly rather enjoyed.' },

    { id:'svevo-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/ItaloSvevo.jpg/330px-ItaloSvevo.jpg', name:'Italo Svevo', area:'Charlton', pc:'SE7', cat:'plaque', year:1861, era:'Blue plaque, lived 1903&ndash;1913',
      lat:51.4855, lon:0.033, addr:'67 Charlton Church Lane, SE7 7AB',
      text:'The Triestine novelist stayed here on business trips for his father-in-law&rsquo;s marine paint company, which ran a factory near Charlton, between 1903 and 1913.\n\nIt was in Trieste, around these same years, that Svevo took English lessons from a struggling young writer named James Joyce &mdash; a friendship that later helped get Svevo&rsquo;s novels noticed at all.' },

    { id:'waugh-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/b/b0/BenjaminWaugh2.jpg', name:'Benjamin Waugh', area:'Greenwich', pc:'SE10', cat:'plaque', year:1839, era:'Blue plaque',
      lat:51.4778, lon:-0.0072, addr:'26 Croom&rsquo;s Hill, SE10 8ER',
      text:'Waugh founded what became the NSPCC in 1884 and spent the following decades campaigning for Britain&rsquo;s first legislation on children&rsquo;s rights.\n\nHe lived to see the 1889 Prevention of Cruelty to Children Act passed &mdash; the law that, for the first time, let the state intervene inside a family home.' },

    { id:'glaisher-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/James_Glaisher.jpg/330px-James_Glaisher.jpg', name:'James Glaisher', area:'Blackheath', pc:'SE10', cat:'plaque', year:1809, era:'Blue plaque',
      lat:51.4718, lon:-0.0079, addr:'20 Dartmouth Hill, SE10 8AJ',
      text:'Glaisher made dozens of scientific balloon ascents to measure temperature and humidity at altitude, work that helped found British meteorology.\n\nOn an 1862 ascent with Henry Coxwell he passed out above 29,000 feet as the balloon kept climbing; Coxwell, his own hands frozen, pulled the valve cord with his teeth to bring them back down alive.' },

    { id:'ross-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/James_Clark_Ross.jpg/330px-James_Clark_Ross.jpg', name:'Sir James Clark Ross', area:'Blackheath', pc:'SE3', cat:'plaque', year:1800, era:'Blue plaque',
      lat:51.4676, lon:0.0007, addr:'2 Eliot Place, SE3 0QL',
      text:'Ross explored both polar regions, locating the North Magnetic Pole in 1831 before leading his own Antarctic expedition from 1839 to 1843.\n\nThe Ross Sea, Ross Ice Shelf and Ross Island all take his name from that one voyage &mdash; three separate features on the map from a single expedition.' },

    { id:'mass-observation-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/The_founding_headquarters_of_MASS-OBSERVATION_a_pioneering_social_survey_1937_%E2%80%93_1939.jpg/330px-The_founding_headquarters_of_MASS-OBSERVATION_a_pioneering_social_survey_1937_%E2%80%93_1939.jpg', name:'Mass-Observation', area:'Blackheath', pc:'SE3', cat:'plaque', year:1937, era:'Blue plaque',
      lat:51.4675, lon:0.0043, addr:'6 Grote&rsquo;s Buildings, SE3 0QG',
      text:'Mass-Observation recruited around 500 volunteer diarists across Britain from 1937 to record ordinary daily life in unprecedented, unfiltered detail.\n\nMany of those diaries survive in the University of Sussex archive and are still mined by historians for how wartime Britain actually felt from the inside, rather than how it was reported.' },

    { id:'blackheath', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Blackheath_village.jpg/330px-Blackheath_village.jpg', name:'Blackheath', area:'Blackheath', pc:'SE3', cat:'memory', year:1381, era:'1381, 1450, 1497',
      lat:51.4676, lon:0.0086, addr:'Blackheath, SE3 0TY',
      text:'Open ground on the road from Kent, and so the natural mustering place for anyone marching on London. Wat Tyler&rsquo;s rebels camped here in June 1381; Jack Cade&rsquo;s men in 1450; Cornish rebels in 1497.\n\nIt is also where John Wesley preached to colliers in the open air, and where James I&rsquo;s Scottish courtiers played the first recorded game of golf in England.' },

    { id:'paragon', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Paragon%2C_SE3_-_geograph.org.uk_-_359588.jpg/330px-The_Paragon%2C_SE3_-_geograph.org.uk_-_359588.jpg', name:'The Paragon', area:'Blackheath', pc:'SE3', cat:'grand', year:1794, era:'Built 1794&ndash;1807',
      lat:51.4661, lon:0.0104, addr:'The Paragon, SE3 0NY',
      text:'Michael Searles&rsquo;s crescent of seven pairs of houses linked by single-storey Doric colonnades &mdash; a piece of Bath set down on the edge of the heath.\n\nGutted by a flying bomb in 1944 and rebuilt from its own ruins in the 1950s by Charles Bernard Brown, who reused what he could find in the rubble.' },

    { id:'mcgill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Donald_McGill_-_5_Bennett_Park%2C_Blackheath%2C_SE3.JPG/330px-Donald_McGill_-_5_Bennett_Park%2C_Blackheath%2C_SE3.JPG', name:'Donald McGill', area:'Bennett Park', pc:'SE3', cat:'plaque', year:1875, era:'Blue plaque',
      lat:51.4652, lon:0.0072, addr:'5 Bennett Park, SE3 9RA',
      text:'The saucy seaside postcard was more or less invented at this address. McGill drew around 12,000 designs; they sold by the hundred million.\n\nHe was prosecuted under the Obscene Publications Act in 1954, aged seventy-nine, and fined &pound;50. George Orwell had already written an essay in his defence.' },

    { id:'horniman', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/An_aerial_view_of_the_Horniman_Museum_and_Gardens.png/330px-An_aerial_view_of_the_Horniman_Museum_and_Gardens.png', name:'Horniman Museum', area:'Forest Hill', pc:'SE23', cat:'culture', year:1901, era:'Opened 1901',
      lat:51.4406, lon:-0.061, addr:'100 London Road, SE23 3PQ',
      text:'Frederick Horniman spent tea-trading money on some 30,000 objects, ran out of house, and gave the lot to the people of London in a building by Charles Harrison Townsend.\n\nThe famous overstuffed walrus was mounted in the 1870s by a taxidermist who had never seen a live one and smoothed out all the folds of skin.' },

    { id:'shackleton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Ernest_Shackleton_before_1909.jpg/330px-Ernest_Shackleton_before_1909.jpg', name:'Ernest Shackleton', area:'Sydenham', pc:'SE26', cat:'plaque', year:1885, era:'Blue plaque',
      lat:51.4288, lon:-0.0625, addr:'12 Westwood Hill, SE26 6QQ',
      text:'The Shackleton family moved to 12 Westwood Hill in 1885. Ernest walked from here to Dulwich College, hated it, and went to sea at sixteen.\n\nThe famous &ldquo;Men wanted for hazardous journey&rdquo; advertisement is almost certainly apocryphal. The Endurance did sail with a stowaway, Perce Blackborow, who was kept on as steward.' },

    { id:'baird-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/John_Logie_Baird_in_1917.jpg/330px-John_Logie_Baird_in_1917.jpg', name:'John Logie Baird', area:'Sydenham', pc:'SE26', cat:'plaque', year:1888, era:'Blue plaque',
      lat:51.4333, lon:-0.0734, addr:'3 Crescent Wood Road, SE26 6RT',
      text:'Baird lived here while developing the mechanical television system he first demonstrated publicly in a Soho attic in January 1926.\n\nHis early receivers used a spinning cardboard disc and a knitting needle; within two years he had also demonstrated colour television and an early videodisc recording.' },

    { id:'pettit-smith-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Francis_Pettit_Smith.jpg/330px-Francis_Pettit_Smith.jpg', name:'Sir Francis Pettit Smith', area:'Sydenham', pc:'SE26', cat:'plaque', year:1808, era:'Blue plaque',
      lat:51.4284, lon:-0.0754, addr:'Fountain House, 17 Sydenham Hill, SE26 6SH',
      text:'Smith patented the screw propeller in 1836 and drove the construction of the SS Archimedes, the first ship built specifically to prove it worked.\n\nThe Archimedes toured British ports as a demonstration and reportedly persuaded Brunel to abandon paddle wheels and refit the SS Great Britain with a screw propeller instead.' },

    { id:'dinosaurs', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Mantellodon_in_Crystal_Palace_Park.jpg/330px-Mantellodon_in_Crystal_Palace_Park.jpg', name:'Crystal Palace Dinosaurs', area:'Crystal Palace Park', pc:'SE19', cat:'works', year:1854, era:'Unveiled 1854',
      lat:51.4184, lon:-0.0654, addr:'Crystal Palace Park, SE19 2GA',
      text:'The first attempt anywhere to reconstruct extinct animals at full size &mdash; thirty concrete beasts by Benjamin Waterhouse Hawkins, advised by Richard Owen, who had coined the word dinosaur.\n\nOwen held a dinner for twenty guests inside the unfinished iguanodon mould on New Year&rsquo;s Eve 1853. The animals are now Grade I listed, wrong anatomy and all.' },

    { id:'crystal-palace-terraces', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Crystal_Palace_Park.jpg/330px-Crystal_Palace_Park.jpg', name:'Crystal Palace terraces', area:'Crystal Palace Park', pc:'SE19', cat:'works', year:1854, era:'1854&ndash;1936',
      lat:51.4222, lon:-0.0723, addr:'Crystal Palace Parade, SE19 2GA',
      text:'Paxton&rsquo;s Great Exhibition building was taken down in Hyde Park, enlarged, and re-erected on this ridge. It burned down in a single night in November 1936.\n\nWhat is left is the earthwork: Italianate terraces, broken flights of steps, and a row of sphinxes. The glow of the fire was visible from Brighton.' },

    { id:'besant-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Annie_Besant_-_portrait.jpg/330px-Annie_Besant_-_portrait.jpg', name:'Annie Besant', area:'Gipsy Hill', pc:'SE19', cat:'plaque', year:1847, era:'Blue plaque',
      lat:51.4241, lon:-0.0814, addr:'39 Colby Road, SE19 1HA',
      text:'Besant lived here in 1874, early in a career that ran from socialist campaigning to theosophy to the presidency of the Indian National Congress in 1917.\n\nShe was the first woman to hold that Congress presidency, and spent her final decades in India campaigning for home rule alongside the causes she&rsquo;d taken up in London.' },

    { id:'leslie-howard-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Leslie_Howard_GWTW.jpg/330px-Leslie_Howard_GWTW.jpg', name:'Leslie Howard', area:'Upper Norwood', pc:'SE19', cat:'plaque', year:1893, era:'Blue plaque',
      lat:51.4221, lon:-0.0789, addr:'45 Farquhar Road, SE19 1SS',
      text:'Howard played Ashley Wilkes in Gone with the Wind and was one of the most bankable British actors of the 1930s, working across both London and Hollywood.\n\nHe was killed in 1943 when a civilian airliner he was travelling on was shot down over the Bay of Biscay &mdash; a loss some historians still attribute to the Luftwaffe mistaking his flight for Churchill&rsquo;s.' },

    { id:'lockwood-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Margaret_Lockwood_1940_U.S._press_photo.jpg/330px-Margaret_Lockwood_1940_U.S._press_photo.jpg', name:'Margaret Lockwood', area:'Upper Norwood', pc:'SE19', cat:'plaque', year:1916, era:'Blue plaque',
      lat:51.4214, lon:-0.0856, addr:'14 Highland Road, SE19 1DP',
      text:'Lockwood was one of Britain&rsquo;s most popular film stars of the 1930s and 40s, starring in The Lady Vanishes and The Wicked Lady.\n\nAt her commercial peak during the war, she was reportedly Britain&rsquo;s highest-paid film actress, more bankable at the domestic box office than any Hollywood import.' },

    { id:'dulwich-gallery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Dulwich_Picture_Gallery%2C_main_entrance.JPG/330px-Dulwich_Picture_Gallery%2C_main_entrance.JPG', name:'Dulwich Picture Gallery', area:'Dulwich Village', pc:'SE21', cat:'culture', year:1817, era:'Opened 1817',
      lat:51.4459, lon:-0.0872, addr:'Gallery Road, SE21 7AD',
      text:'Sir John Soane&rsquo;s building was England&rsquo;s first purpose-built public art gallery &mdash; and, at the founders&rsquo; insistence, doubles as their mausoleum.\n\nSoane&rsquo;s top-lit galleries invented the way we still hang paintings, and he took no fee for the design. Its small Rembrandt, Portrait of Jacob de Gheyn III, holds a Guinness World Record as the most-stolen painting anywhere &mdash; lifted four times, in 1966, 1973, 1981 and 1983, and nicknamed the &ldquo;takeaway Rembrandt&rdquo; for its portable size.' },

    { id:'dulwich-college', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Christ%27s_Chapel_of_God%27s_Gift_-_geograph.org.uk_-_840002.jpg/330px-Christ%27s_Chapel_of_God%27s_Gift_-_geograph.org.uk_-_840002.jpg', name:'Edward Alleyn&rsquo;s College of God&rsquo;s Gift', area:'Dulwich', pc:'SE21', cat:'culture', year:1619, era:'Founded 1619',
      lat:51.4405, lon:-0.0842, addr:'Dulwich Common, SE21 7LD',
      text:'Edward Alleyn, the great actor of Marlowe&rsquo;s leading roles and part-owner of the Rose, spent his theatrical fortune on a school and almshouse here in 1619.\n\nThe college archive holds Philip Henslowe&rsquo;s papers &mdash; including the 1598 property list for the Rose, which itemises &ldquo;j Hell mought&rdquo;: one mouth of Hell.' },

    { id:'joan-clarke-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/JOAN_CLARKE_-_193_Rosendale_Road_West_Dulwich_London_SE21_8LW.jpg/330px-JOAN_CLARKE_-_193_Rosendale_Road_West_Dulwich_London_SE21_8LW.jpg', name:'Joan Clarke', area:'West Dulwich', pc:'SE21', cat:'plaque', year:1917, era:'Blue plaque',
      lat:51.4436, lon:-0.0979, addr:'193 Rosendale Road, SE21 8LW',
      text:'Clarke worked as a senior cryptanalyst in Hut 8 at Bletchley Park, one of very few women given that rank, helping break the German naval Enigma cipher.\n\nShe was briefly engaged to Alan Turing in 1941; both later described it, without acrimony, as a mismatch neither had really been suited to.' },

    { id:'durrell-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/9/9d/Gerald_Durrell%2C_Askania_Nova_%28cropped%29.jpg', name:'Gerald Durrell', area:'Dulwich', pc:'SE21', cat:'plaque', year:1925, era:'Blue plaque',
      lat:51.4346, lon:-0.0865, addr:'43 Alleyn Park, SE21 8AT',
      text:'Durrell lived here as a young child before his family&rsquo;s move to Corfu in 1935 &mdash; the years he later mythologised in My Family and Other Animals.\n\nHe went on to found Jersey Zoo specifically to breed endangered species for reintroduction, at a time when most zoos still existed mainly to display animals rather than save them.' },

    { id:'blyton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Enid_Blyton_c._1923.jpg/330px-Enid_Blyton_c._1923.jpg', name:'Enid Blyton', area:'East Dulwich', pc:'SE22', cat:'plaque', year:1897, era:'Blue plaque',
      lat:51.4471, lon:-0.071, addr:'354 Lordship Lane, SE22 8LZ',
      text:'Blyton was born in a flat above a shop on Lordship Lane in August 1897 &mdash; a plainer beginning than the sunlit countryside of the books suggests.\n\nShe published around 700 titles. At her peak she wrote 10,000 words a day, typewriter balanced on her knee, a shawl over the keys.' },

    { id:'forester-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/C._S._Forester_in_1939.jpg/330px-C._S._Forester_in_1939.jpg', name:'C. S. Forester', area:'East Dulwich', pc:'SE22', cat:'plaque', year:1899, era:'Blue plaque',
      lat:51.4455, lon:-0.0652, addr:'58 Underhill Road, SE22 0QT',
      text:'Forester, born Cecil Louis Troughton Smith, wrote the twelve-volume Hornblower series charting one fictional Royal Navy officer&rsquo;s career through the Napoleonic Wars.\n\nTwo of the novels, A Ship of the Line and Flying Colours, jointly won the James Tait Black Memorial Prize in 1938 &mdash; a rare case of genre adventure fiction taking a serious literary award.' },

    { id:'cotton-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Henry_Cotton_golf_1931b.jpg/330px-Henry_Cotton_golf_1931b.jpg', name:'Henry Cotton', area:'East Dulwich', pc:'SE22', cat:'plaque', year:1907, era:'Blue plaque',
      lat:51.4592, lon:-0.071, addr:'47 Crystal Palace Road, SE22 9EX',
      text:'Cotton won the Open Championship three times, in 1934, 1937 and 1948, and was the dominant British golfer of his generation.\n\nHis 1934 win ended a run of American victories in the Championship stretching back a decade.' },

    { id:'karloff', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Frankenstein%27s_monster_%28Boris_Karloff%29.jpg/330px-Frankenstein%27s_monster_%28Boris_Karloff%29.jpg', name:'Boris Karloff', area:'East Dulwich', pc:'SE22', cat:'plaque', year:1887, era:'Blue plaque',
      lat:51.4553, lon:-0.0672, addr:'36 Forest Hill Road, SE22 0RR',
      text:'William Henry Pratt was born here in November 1887, the youngest of nine, in a family of colonial civil servants who expected him to join the diplomatic service. He emigrated to Canada instead.\n\nHe had taken the name Karloff long before Frankenstein &mdash; where the opening credits list the monster&rsquo;s actor only as a question mark.' },

    { id:'nunhead', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/London_Nunhead_Cemetery_Entrance.JPG/330px-London_Nunhead_Cemetery_Entrance.JPG', name:'Nunhead Cemetery', area:'Nunhead', pc:'SE15', cat:'green', year:1840, era:'Consecrated 1840',
      lat:51.4581, lon:-0.0552, addr:'Linden Grove, SE15 3LP',
      text:'One of the Magnificent Seven Victorian cemeteries, opened in 1840, abandoned in 1969 and reclaimed by ash and sycamore. Fifty-two acres, half of it now woodland.\n\nThe Scottish Martyrs&rsquo; Memorial &mdash; a forty-foot obelisk near the main path &mdash; commemorates five men transported to Botany Bay in 1793 for arguing that ordinary people should have the vote.' },

    { id:'moody', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Harold_Moody_by_Ronald_Moody_02.jpg/330px-Harold_Moody_by_Ronald_Moody_02.jpg', name:'Dr Harold Moody', area:'Peckham', pc:'SE15', cat:'plaque', year:1931, era:'Blue plaque',
      lat:51.4735, lon:-0.0512, addr:'164 Queen&rsquo;s Road, SE15 2ND',
      text:'Moody qualified at the top of his year at King&rsquo;s, was refused hospital posts because he was Black, and opened his own practice at this house in 1913.\n\nHe founded the League of Coloured Peoples here in 1931 &mdash; the campaign that pushed against the colour bar in hospitals, hotels and the armed forces.' },

    { id:'pioneer-health', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dr._INNES_PEARSE_and_Dr._GEORGE_SCOTT_WILLIAMSON_-_142_Queen%27s_Road_Peckham_London_SE15_2HP.jpg/330px-Dr._INNES_PEARSE_and_Dr._GEORGE_SCOTT_WILLIAMSON_-_142_Queen%27s_Road_Peckham_London_SE15_2HP.jpg', name:'The Peckham Experiment', area:'St Mary&rsquo;s Road', pc:'SE15', cat:'works', year:1935, era:'Opened 1935',
      lat:51.472, lon:-0.0645, addr:'St Mary&rsquo;s Road, SE15 2DR &mdash; now flats',
      text:'The Pioneer Health Centre: 950 local families paid a shilling a week for a swimming pool, a theatre, a workshop and a yearly family health check.\n\nOwen Williams&rsquo;s glass-walled concrete frame was designed so doctors could watch families at play. The point was to study health rather than treat disease.' },

    { id:'new-cross-fire', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/New_Cross_Fire_took_place_at_this_site_on_January_18%2C_1981_claiming_the_lives_of_14_young_people.jpg/330px-New_Cross_Fire_took_place_at_this_site_on_January_18%2C_1981_claiming_the_lives_of_14_young_people.jpg', name:'New Cross Fire memorial', area:'New Cross', pc:'SE14', cat:'memory', year:1981, era:'18 January 1981',
      lat:51.4757, lon:-0.0345, addr:'439 New Cross Road, SE14 6TA',
      text:'Thirteen young people died after a fire at a sixteenth birthday party at this address on 18 January 1981. A fourteenth survivor died two years later.\n\nThe Black People&rsquo;s Day of Action that March marched 20,000 people from Fordham Park to Hyde Park under the words: thirteen dead, nothing said.' },

    { id:'battle-of-lewisham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Plaque_for_the_Battle_of_Lewisham%2C_New_Cross_Road_and_Clifton_Rise_%28cropped%29.jpg/330px-Plaque_for_the_Battle_of_Lewisham%2C_New_Cross_Road_and_Clifton_Rise_%28cropped%29.jpg', name:'Battle of Lewisham', area:'Clifton Rise, New Cross', pc:'SE14', cat:'memory', year:1977, era:'13 August 1977',
      lat:51.4764, lon:-0.0336, addr:'Clifton Rise, SE14 6JP',
      text:'On 13 August 1977 several thousand people blocked a National Front march at Clifton Rise. The day is widely credited with breaking the NF&rsquo;s ability to march at will.\n\nA commemorative plaque was unveiled nearby in 2017, on the fortieth anniversary &mdash; forty years being roughly how long it took for the counter-demonstrators to be called anything but a mob.' },

    { id:'brunel-tunnel', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Thamestunnel.jpg/330px-Thamestunnel.jpg', name:'Brunel Museum &amp; Thames Tunnel', area:'Rotherhithe', pc:'SE16', cat:'works', year:1843, era:'Opened 1843',
      lat:51.5013, lon:-0.053, addr:'Railway Avenue, SE16 4LF',
      text:'Marc Brunel&rsquo;s tunnelling shield &mdash; patented after watching a shipworm bore through oak &mdash; made the first tunnel under a navigable river possible. His son Isambard nearly drowned in it twice.\n\nFifty thousand people walked through on opening day at a penny each. The Grand Entrance Hall was then sealed and stood empty for 145 years.' },

    { id:'mayflower', img:'https://upload.wikimedia.org/wikipedia/commons/9/98/St_Marys_Church_Rotherhithe.JPG', name:'St Mary&rsquo;s Rotherhithe', area:'Rotherhithe', pc:'SE16', cat:'maritime', year:1620, era:'Sailed 1620',
      lat:51.501, lon:-0.0518, addr:'St Marychurch Street, SE16 4JE',
      text:'The Mayflower left Rotherhithe in July 1620 to collect her passengers downriver. Her master, Christopher Jones, came home, died within two years and is buried in this churchyard.\n\nThe ship was broken up here in 1624. The church&rsquo;s communion table is said to be made from her timbers.' },

    { id:'ada-salter-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ada_Salter.jpg/330px-Ada_Salter.jpg', name:'Ada Salter', area:'Rotherhithe', pc:'SE16', cat:'plaque', year:1866, era:'Blue plaque',
      lat:51.4944, lon:-0.0498, addr:'149 Lower Road, SE16 2XL',
      text:'Salter became the first woman mayor of a London borough, and the first Labour woman mayor anywhere in Britain, when Bermondsey elected her in 1922.\n\nHer husband Alfred Salter, already remembered elsewhere in this gazetteer for the statues outside Bermondsey&rsquo;s riverside church, shared her Quaker politics and her long campaign to green and rehouse the borough.' },

    { id:'salter', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Facade_of_St_Mary_Magdalen%27s_church%2C_Bermondsey_-_London_-_England_2024.jpg/330px-Facade_of_St_Mary_Magdalen%27s_church%2C_Bermondsey_-_London_-_England_2024.jpg', name:'Dr Salter&rsquo;s Daydream', area:'Bermondsey Wall East', pc:'SE16', cat:'memory', year:1922, era:'Statues, riverside',
      lat:51.5015, lon:-0.0645, addr:'Bermondsey Wall East, SE16 4TX',
      text:'Alfred and Ada Salter rebuilt Bermondsey between the wars with clean water, solaria, health visitors and 9,000 street trees. Ada was the first woman mayor of a London borough.\n\nThe riverside group shows Alfred on a bench watching his daughter Joyce, who died of scarlet fever aged eight &mdash; caught in the slums her parents were trying to clear.' },

    { id:'faraday', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Faraday_Memorial_SE1_%2849052991483%29.jpg/330px-Faraday_Memorial_SE1_%2849052991483%29.jpg', name:'Faraday Memorial', area:'Elephant &amp; Castle', pc:'SE1', cat:'works', year:1791, era:'Born here 1791',
      lat:51.4946, lon:-0.1, addr:'Elephant &amp; Castle roundabout, SE1 6TE',
      text:'Michael Faraday was born at Newington Butts in 1791, a blacksmith&rsquo;s son apprenticed to a bookbinder, who read the books he was binding and taught himself his way into the Royal Institution.\n\nRodney Gordon&rsquo;s 1961 stainless-steel box on the roundabout is not a sculpture. It is an electricity substation for the Northern line, wearing his name.' },

    { id:'southwark-cathedral', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Northwest_View_of_Southwark_Cathedral_%2801%29.jpg/330px-Northwest_View_of_Southwark_Cathedral_%2801%29.jpg', name:'Southwark Cathedral', area:'Bankside', pc:'SE1', cat:'grand', year:1220, era:'Retrochoir c.1220s',
      lat:51.5061, lon:-0.09, addr:'London Bridge, SE1 9DA',
      text:'The retrochoir of the 1220s is the oldest Gothic church fabric in London. It stood on the bank that held the theatres, the bear pits and the brothels &mdash; outside the City&rsquo;s jurisdiction, by design.\n\nJohn Harvard was baptised here in 1607. Shakespeare&rsquo;s brother Edmund was buried here that same year, the register noting &ldquo;a forenoone knell of the great bell&rdquo;.' },

    { id:'red-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Philip_Webb%27s_Red_House_in_Upton.jpg/330px-Philip_Webb%27s_Red_House_in_Upton.jpg', name:'Red House', area:'Bexleyheath', pc:'DA6', cat:'grand', year:1859, era:'Built 1859',
      lat:51.4576, lon:0.1259, addr:'Red House Lane, DA6 8JF',
      text:'Philip Webb built it for William Morris and his new wife: red brick left bare, a well in the yard, nothing pretending to be anything else. The Arts and Crafts movement effectively begins in this house.\n\nMorris founded his decorating firm in 1861 largely because he could not buy furnishings good enough to put in it.' },

    { id:'morris-webb-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/2/27/Philip_Speakman_Webb.jpg', name:'William Morris &amp; Philip Webb', area:'Bexleyheath', pc:'DA6', cat:'plaque', year:1859, era:'Blue plaque',
      lat:51.4576, lon:0.1259, addr:'Red House Lane, DA6 8JF',
      text:'A blue plaque on Red House itself, already in this gazetteer for the building, separately commemorates the two men who made it: Morris, who commissioned it as a home, and Webb, the architect who designed it.\n\nWebb went on to be called the father of Arts and Crafts architecture; this was his first major commission, built for a friend rather than a client.' },

    { id:'hall-place', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/HallPlace.jpg/330px-HallPlace.jpg', name:'Hall Place', area:'Bexley', pc:'DA5', cat:'grand', year:1537, era:'1537 &amp; 1650s',
      lat:51.4471, lon:0.1475, addr:'Bourne Road, DA5 1PQ',
      text:'A house of two irreconcilable halves: chequerboard flint and rubble from the 1530s at the front, plain red brick from the 1650s behind, joined without apology.\n\nThe chequerwork stone was salvaged from a monastery dissolved a few years earlier. The topiary Queen&rsquo;s Beasts on the lawn were planted for the 1953 coronation.' },

    { id:'tabard-chaucer', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Tabard_inn_mid19th.jpg/330px-Tabard_inn_mid19th.jpg', name:'Site of the Tabard Inn', area:'Talbot Yard, Borough', pc:'SE1', cat:'memory', year:1380, era:'Founded 1307, burned 1676',
      lat:51.5024, lon:-0.0903, addr:'Talbot Yard, Borough High Street, SE1 1PA',
      text:'Geoffrey Chaucer sent his pilgrims off from here in the 1380s &mdash; the Tabard was a working inn, built in 1307 for the Abbot of Hyde, long before it became the opening scene of the Canterbury Tales.\n\nIt burned down in the Great Fire of Southwark in 1676, was rebuilt, and was finally demolished in 1873. Only the name Talbot Yard, and a wall plaque, mark where its gateway stood.' },

    { id:'marshalsea-wall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Marshalsea_prison%2C_London%2C_18th_century_%283%29.jpg/330px-Marshalsea_prison%2C_London%2C_18th_century_%283%29.jpg', name:'Marshalsea Prison wall', area:'Angel Place, Borough', pc:'SE1', cat:'memory', year:1824, era:'Prison closed 1842',
      lat:51.5015, lon:-0.0912, addr:'Angel Place, off Borough High Street, SE1 1LX',
      text:'A single brick wall behind the library garden is the last standing fragment of the Marshalsea debtors&rsquo; prison. Charles Dickens&rsquo;s father was locked up here for debt in 1824, and twelve-year-old Charles was sent out to work in a blacking factory.\n\nDickens rebuilt the prison in fiction as the setting of Little Dorrit, whose heroine is born within its walls. A council plaque on the wall quotes his own description of finding it still standing, decades later.' },

    { id:'cross-bones', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Western_Side_of_Cross_Bones_Graveyard.jpg/330px-Western_Side_of_Cross_Bones_Graveyard.jpg', name:'Cross Bones Graveyard', area:'Redcross Way, Borough', pc:'SE1', cat:'green', year:1853, era:'Closed 1853',
      lat:51.5033, lon:-0.0925, addr:'Redcross Way, SE1 1TA',
      text:'An unconsecrated burial ground for the poor, and for centuries before that for the Bankside &ldquo;Winchester Geese&rdquo; &mdash; the licensed prostitutes of the Bishop of Winchester&rsquo;s Liberty, who could not be buried in holy ground.\n\nA 1990s excavation for the Jubilee line found around 148 skeletons, mostly infants and the very old. The railings are still hung with ribbons, flowers and messages from an ongoing vigil.' },

    { id:'george-inn', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/The_George_Inn_1.jpg/330px-The_George_Inn_1.jpg', name:'The George Inn', area:'Borough High Street', pc:'SE1', cat:'pub', year:1677, era:'Rebuilt 1677',
      lat:51.5027, lon:-0.0906, addr:'77 Borough High Street, SE1 1NH',
      text:'London&rsquo;s last galleried coaching inn, rebuilt after the Great Fire of Southwark of 1676 on a medieval footprint. Two tiers of open wooden gallery still look down onto the yard where mail coaches once loaded.\n\nDickens drank in the coffee room and gave the George a passing mention in Little Dorrit. The National Trust has owned it since 1937 and leases it out as a working pub.' },

    { id:'anchor-bankside', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Anchor_Bankside_SE1.jpg/330px-Anchor_Bankside_SE1.jpg', name:'The Anchor Bankside', area:'Bankside', pc:'SE1', cat:'pub', year:1770, era:'Rebuilt c.1770&ndash;75',
      lat:51.5075, lon:-0.0925, addr:'34 Park Street, SE1 9EF',
      text:'Built as the tap room for the Anchor Brewery, on the site where Shakespeare&rsquo;s first Globe stood before it burned down in 1613. Samuel Pepys is thought to have watched the Great Fire of London from a Bankside alehouse nearby in 1666.\n\nEarly nineteenth-century repairs uncovered hidden cavities behind an oak beam, probably used by river smugglers to stash contraband landed here at low tide.' },

    { id:'old-thameside-inn', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Old_Thameside_Inn%2C_Bankside%2C_SE1.jpg/330px-Old_Thameside_Inn%2C_Bankside%2C_SE1.jpg', name:'The Old Thameside Inn', area:'Clink Street', pc:'SE1', cat:'pub', year:1980, era:'Warehouse to pub, 1980s',
      lat:51.5069, lon:-0.0913, addr:'Pickfords Wharf, Clink Street, SE1 9DG',
      text:'A former spice warehouse on Pickfords Wharf, converted into a pub within sight of wharves that have worked this stretch of river since the sixteenth century.\n\nIt stands beside the Clink, the Bishop of Winchester&rsquo;s private prison &mdash; a site that has held a jail, on and off, since the ninth century, and given the language its word for a lock-up.' },

    { id:'samuel-smiles', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Samuel_Smiles_by_Sir_George_Reid.jpg/330px-Samuel_Smiles_by_Sir_George_Reid.jpg', name:'Samuel Smiles', area:'Blackheath edge, Lewisham', pc:'SE13', cat:'plaque', year:1859, era:'Blue plaque',
      lat:51.4657, lon:-0.0106, addr:'11 Granville Park, SE13 7DY',
      text:'Smiles wrote Self-Help at this address in 1859 &mdash; a manual of Victorian self-improvement that sold a quarter of a million copies in his lifetime and gave the language the phrase &ldquo;heaven helps those who help themselves.&rdquo;\n\nHe had started out as a Chartist campaigning for parliamentary reform; critics have long argued Self-Help quietly abandoned that earlier radicalism rather than answered it.' },

    { id:'francis-baring', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/BaringArms.PNG/330px-BaringArms.PNG', name:'Sir Francis Baring', area:'Manor House, Hither Green', pc:'SE13', cat:'plaque', year:1796, era:'Bought manor 1796',
      lat:51.4551, lon:0.0072, addr:'Old Road, Hither Green, SE13 5SY',
      text:'The founder of Barings Bank bought Lee Manor House in 1796 with a fortune built on trade finance. He died in 1810 worth some &pound;606,000 &mdash; among the largest personal estates in England at the time.\n\nThe Baring family&rsquo;s ownership shaped the roads of Lee and Hither Green for a century afterwards; several streets nearby still trace their names back to the family.' },

    { id:'flecker', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/James_Elroy_Flecker_at_Cambridge.jpg/330px-James_Elroy_Flecker_at_Cambridge.jpg', name:'James Elroy Flecker', area:'Lee', pc:'SE13', cat:'plaque', year:1884, era:'Blue plaque',
      lat:51.452, lon:0.0102, addr:'9 Gilmore Road, Lee, SE13 5AD',
      text:'Flecker was born at this address in 1884. He died of tuberculosis in a Swiss sanatorium in 1915, aged thirty, having written the play Hassan and the verse for which he is still remembered.\n\nHassan reached the stage only after his death, in 1923, with incidental music by Frederick Delius &mdash; a considerable posthumous hit for a poet who never saw it performed.' },

    { id:'stanley-unwin', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/St_Margaret%27s_Church%2C_Lee.jpg/330px-St_Margaret%27s_Church%2C_Lee.jpg', name:'Sir Stanley Unwin', area:'Lee', pc:'SE12', cat:'plaque', year:1914, era:'Blue plaque',
      lat:51.4506, lon:0.0126, addr:'13 Handen Road, Lee, SE12 8NP',
      text:'Unwin bought a controlling interest in the publisher George Allen &amp; Sons in 1914 and renamed it George Allen &amp; Unwin. In 1936 he had his ten-year-old son read a manuscript by an Oxford don and paid him a shilling for a verdict on it.\n\nThe manuscript was The Hobbit. The boy liked it, and Unwin published J.R.R. Tolkien largely on the strength of that shilling report.' },

    { id:'dowson-greening', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Dowson_Court_Belmont_Grove_Blackheath_London_SE13_5DT.jpg/330px-Dowson_Court_Belmont_Grove_Blackheath_London_SE13_5DT.jpg', name:'Ernest Dowson &amp; Edward Owen Greening', area:'Belmont Grove, Lewisham', pc:'SE13', cat:'plaque', year:1867, era:'Shared plaque',
      lat:51.4643, lon:-0.0084, addr:'Dowson Court, Belmont Grove, SE13 5AU',
      text:'A single plaque for two very different Lewisham men: Dowson, the decadent poet who gave English the phrases &ldquo;days of wine and roses&rdquo; and &ldquo;gone with the wind&rdquo; before dying at thirty-two, and Greening, a lifelong evangelist for the co-operative movement.\n\nDowson&rsquo;s most quoted line &mdash; &ldquo;I have been faithful to thee, Cynara, in my fashion&rdquo; &mdash; supplied both a Cole Porter lyric and the title of Gone with the Wind.' },

    { id:'leland-duncan', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Leland_Lewis_Duncan_house_-_8_Lingards_Road_Lewisham_London_SE13_6DH.jpg/330px-Leland_Lewis_Duncan_house_-_8_Lingards_Road_Lewisham_London_SE13_6DH.jpg', name:'Leland Lewis Duncan', area:'Lewisham', pc:'SE13', cat:'plaque', year:1862, era:'Blue plaque',
      lat:51.46, lon:-0.0138, addr:'8 Lingards Road, SE13 6QG',
      text:'A civil servant by day, Duncan spent his evenings indexing wills at Somerset House and researching the borough he lived in. His History of Lewisham Parish, published in 1908, remains a primary source for local historians.\n\nHe also transcribed monumental inscriptions in dozens of Kent churchyards before their headstones weathered past reading &mdash; unpaid, exhaustive work that still underpins the borough archive today.' },

    { id:'cecil-hepworth', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Cecil_M._Hepworth_1915.jpg/330px-Cecil_M._Hepworth_1915.jpg', name:'Cecil M. Hepworth', area:'Lewisham', pc:'SE13', cat:'plaque', year:1874, era:'Blue plaque',
      lat:51.4638, lon:-0.0148, addr:'17 Somerset Gardens, SE13 5JR',
      text:'A pioneer of British cinema who filmed Queen Victoria&rsquo;s funeral in 1901 and produced the first screen Alice in Wonderland in 1903. His 1905 chase film Rescued by Rover, shot largely around his own house, was an early box-office sensation.\n\nHepworth had to reshoot Rescued by Rover twice because the original negatives wore out from demand &mdash; using the same actors, dog and street each time, years apart.' },

    { id:'mcmillan-sisters', img:'https://upload.wikimedia.org/wikipedia/commons/5/51/Rachel_and_Margaret_McMillan_plaque%2C_Bromley.jpg', name:'Margaret &amp; Rachel McMillan', area:'Hither Green', pc:'SE13', cat:'plaque', year:1910, era:'Blue plaque',
      lat:51.4528, lon:-0.009, addr:'127 George Lane, SE13 6HB',
      text:'The McMillan sisters lived here while campaigning for school meals, medical inspection and open-air nursery education for slum children &mdash; work that fed directly into the Provision of School Meals Act of 1906.\n\nMargaret went on to found the first open-air nursery school in Deptford in 1914; nursery education in Britain still largely follows the outdoor, health-first model the sisters worked out from this house.' },

    { id:'george-grove', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/George-grove.jpg/330px-George-grove.jpg', name:'Sir George Grove', area:'Sydenham', pc:'SE26', cat:'plaque', year:1852, era:'Lived here 1852&ndash;1860',
      lat:51.4283, lon:-0.0602, addr:'14 Westwood Hill, SE26 6QR',
      text:'Grove was secretary of the Crystal Palace Company when it rebuilt Paxton&rsquo;s glasshouse on Sydenham Hill in 1852, and moved here to be close to the works. He later compiled the Dictionary of Music and Musicians that still carries his name.\n\nGrove had trained as a civil engineer, not a musicologist &mdash; he came to music scholarship in middle age, after a career spent building lighthouses in the Caribbean.' },

    { id:'eleanor-marx', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mrs_Eleanor_Marx_Aveling%2C_daughter_of_Karl_Marx.jpg/330px-Mrs_Eleanor_Marx_Aveling%2C_daughter_of_Karl_Marx.jpg', name:'Eleanor Marx', area:'Sydenham', pc:'SE26', cat:'plaque', year:1895, era:'Lived here 1895&ndash;1898',
      lat:51.427, lon:-0.058, addr:'7 Jews Walk, SE26 6PJ',
      text:'Karl Marx&rsquo;s youngest daughter bought this house with money left to her by Friedrich Engels and spent her last years here organising for the dockers&rsquo; and gasworkers&rsquo; unions and for women&rsquo;s suffrage.\n\nShe wrote to her sister that she was &ldquo;Jewishly proud&rdquo; of the address. She died at the house in 1898, poisoned by prussic acid, in circumstances biographers still argue over.' },

    { id:'greyhound-sydenham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/The_Greyhound%2C_Sydenham.jpg/330px-The_Greyhound%2C_Sydenham.jpg', name:'The Greyhound', area:'Sydenham', pc:'SE26', cat:'pub', year:1720, era:'Trading since c.1720',
      lat:51.4247, lon:-0.0538, addr:'2 Sydenham Road, SE26 5SE',
      text:'An inn has stood here since at least 1713; Joseph Hyde, the first landlord on record, is named in 1726, the year before the name Greyhound is first used for it.\n\nIt traded for two centuries as a coaching stop on the road up from Sydenham Wells, a once-fashionable spa whose spring water was said to cure everything from gout to melancholy.' },

    { id:'blythe-hill-tavern', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Blythe_Hill_Tavern%2C_Forest_Hill%2C_SE23_%283756867279%29.jpg/330px-Blythe_Hill_Tavern%2C_Forest_Hill%2C_SE23_%283756867279%29.jpg', name:'Blythe Hill Tavern', area:'Forest Hill border', pc:'SE23', cat:'pub', year:1866, era:'Built c.1866',
      lat:51.443, lon:-0.0447, addr:'319 Stanstead Road, SE23 1JB',
      text:'A Grade II listed corner pub, built around 1866 and refitted inside in the Brewer&rsquo;s Tudor style of the 1920s and &rsquo;30s &mdash; dark oak, leaded glass, a fire in every room.\n\nIt has been repeatedly named among London&rsquo;s best pubs &mdash; Time Out included it again in 2023 &mdash; on a road that gives no outward hint of what is inside.' },

    { id:'catford-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Catford_gyratory.jpg/330px-Catford_gyratory.jpg', name:'Catford House', area:'Catford Broadway', pc:'SE6', cat:'pub', year:1736, era:'Built 1736',
      lat:51.4453, lon:-0.0223, addr:'Catford Broadway, SE6 4SP',
      text:'The oldest building in Catford: a Georgian farmhouse of 1736 with a distinctive M-shaped roof, one of only a handful of its kind left standing in the borough. For most of the twentieth century it served as the Catford Constitutional Club, a popular social club and pub, before closing abruptly in August 2019 due to serious structural and safety issues that left it derelict for years.\n\nA council-backed restoration led by Hayatsu Architects, supported by &pound;1.8m from the Mayor of London\'s Good Growth Fund, repaired and rebuilt the site while preserving the historic Georgian core. It reopened in November 2025 as The Catford House, a community venue run by the Greenwich Co-operative Development Agency (GCDA), combining a pub and garden with a community kitchen and flexible event spaces &mdash; opening the original 1736 Georgian hall to the public for the first time in its history.' },

    { id:'black-horse-harrow', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Catford_gyratory.jpg/330px-Catford_gyratory.jpg', name:'Black Horse &amp; Harrow', area:'Rushey Green, Catford', pc:'SE6', cat:'pub', year:1700, era:'Inn since c.1700',
      lat:51.4413, lon:-0.0222, addr:'167 Rushey Green, SE6 4BD',
      text:'Catford&rsquo;s oldest hostelry, with an inn recorded on this site since around 1700, when it stood on the coaching road out to Tonbridge and Hastings, long before the Victorian rebuild you see now.\n\nThat Victorian rebuild turned a coaching inn into a full gin palace, all etched glass and dark mahogany &mdash; the kind of makeover dozens of London road-houses got as railways killed off the coach trade.' },

    { id:'wollstonecraft', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mary_Wollstonecraft_Portrait.jpg/330px-Mary_Wollstonecraft_Portrait.jpg', name:'Mary Wollstonecraft', area:'near Blackfriars Road', pc:'SE1', cat:'plaque', year:1788, era:'Blue plaque, unveiled 2004',
      lat:51.504, lon:-0.103, addr:'45 Dolben Street, SE1 0UQ',
      text:'Southwark&rsquo;s own plaque scheme marks the house where Mary Wollstonecraft lived in 1788, having crossed the river to be near her publisher after losing work as a governess in Ireland.\n\nIt was unveiled in 2004 by her biographer Claire Tomalin &mdash; sixteen years before a bronze likeness in Newington Green stirred national argument over how to depict her at all.' },

    { id:'rose-theatre', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Site_of_The_Rose_Theatre_-_56_Park_Street_Southwark_London_SE1.jpg/330px-Site_of_The_Rose_Theatre_-_56_Park_Street_Southwark_London_SE1.jpg', name:'The Rose Theatre', area:'Park Street, Bankside', pc:'SE1', cat:'culture', year:1587, era:'Built 1587',
      lat:51.5075, lon:-0.0965, addr:'56 Park Street, SE1 9AR',
      text:'The first Elizabethan playhouse on Bankside, raised five years before the Globe and staging early work by Marlowe and Shakespeare. Its foundations turned up in 1989, during an office redevelopment that nearly built straight over them.\n\nPublic pressure over the discovery held the builders up for months. The waterlogged remains are still there, lit red, in the basement of the office block that finally went up on top.' },

    { id:'sam-wanamaker', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Restaurante_The_Swan%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_113.jpg/330px-Restaurante_The_Swan%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_113.jpg', name:'Shakespeare&rsquo;s Globe', area:'New Globe Walk, Bankside', pc:'SE1', cat:'culture', year:1997, era:'Rebuilt, opened 1997',
      lat:51.5081, lon:-0.0972, addr:'21 New Globe Walk, SE1 9DT',
      text:'The American actor-director Sam Wanamaker spent over two decades and much of his own money reconstructing Shakespeare&rsquo;s Globe close to its original site. He died four months before it opened in 1997.\n\nHe first came looking for the Globe in 1949 and found nothing but a blackened commemorative plaque bolted to a brewery wall &mdash; the closest London had come to marking it at all.' },

    { id:'peter-tatchell', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Peter_Tatchell_-_Red_Wall_-_8by10_-_2016-10-15.jpg/330px-Peter_Tatchell_-_Red_Wall_-_8by10_-_2016-10-15.jpg', name:'Peter Tatchell', area:'Elephant &amp; Castle', pc:'SE1', cat:'resident', year:2010, era:'Blue plaque installed 2010',
      lat:null, lon:null, addr:'',
      text:'Prominent human rights and gay rights campaigner who has lived for decades on the Rockingham Estate. Southwark Council installed a blue plaque in his name at his home in 2010, recognising his decades of activism.' },

    { id:'peter-tatchell', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Peter_Tatchell_-_Red_Wall_-_8by10_-_2016-10-15.jpg/330px-Peter_Tatchell_-_Red_Wall_-_8by10_-_2016-10-15.jpg', name:'Peter Tatchell', area:'Rockingham Street', pc:'SE1', cat:'plaque', year:2010, era:'Blue plaque, unveiled 2010',
      lat:51.4955, lon:-0.0975, addr:'62 Arrol House, Rockingham Street, SE1 6QL',
      text:'Marks the council flat the LGBT-rights and human-rights campaigner has lived in since 1978, awarded under Southwark&rsquo;s scheme for commemorating people while they are still living.\n\nIan McKellen unveiled it in 2010, decades into a campaign run largely from this same address &mdash; direct action planned at the kitchen table.' },

    { id:'red-cross-garden', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Redcross_Gardens_and_Cottages_%287327429482%29.jpg/330px-Redcross_Gardens_and_Cottages_%287327429482%29.jpg', name:'Red Cross Garden', area:'Redcross Way, Borough', pc:'SE1', cat:'green', year:1887, era:'Opened 1887',
      lat:51.5023, lon:-0.094, addr:'Redcross Way, SE1 1HA',
      text:'The housing reformer Octavia Hill created this pocket park as &ldquo;an oasis in Southwark&rdquo; for slum-dwelling families, complete with a cottage hall for recreation and evening classes.\n\nIt predates the far larger institution she is now remembered for: Hill co-founded the National Trust a few years later. The garden was restored to her 1887 layout in the 2000s.' },

    { id:'una-marson', img:'https://upload.wikimedia.org/wikipedia/commons/8/85/Una_Marson_-_BBC_-_WWII.jpg', name:'Una Marson', area:'Brunswick Park, Camberwell', pc:'SE5', cat:'plaque', year:1939, era:'Blue plaque',
      lat:51.4735, lon:-0.0895, addr:'16 Brunswick Park, SE5 7RN',
      text:'A plaque at her Camberwell home marks the Jamaican poet and playwright who became, in 1939, the BBC&rsquo;s first Black woman programme-maker, producing Calling the West Indies for colonial servicemen overseas.\n\nHer wartime series was the direct forerunner of Caribbean Voices, which gave early broadcasts to a young Derek Walcott and V. S. Naipaul.' },

    { id:'peek-frean', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Peek-freans-red-logo_%28cropped%29.png/330px-Peek-freans-red-logo_%28cropped%29.png', name:'Peek Frean&rsquo;s Biscuit Factory', area:'Clements Road, Bermondsey', pc:'SE16', cat:'works', year:1866, era:'Factory built 1866',
      lat:51.497, lon:-0.0555, addr:'100 Clements Road, SE16 4DG',
      text:'James Peek and George Hender Frean moved their young biscuit firm here in 1866, giving Bermondsey the nickname &ldquo;Biscuit Town&rdquo; and inventing, among others, the Bourbon and the Garibaldi.\n\nThe factory ran until 1989. Peek Frean&rsquo;s also gave Britain, in 1901, its first cream cracker.' },

    { id:'manze-pie-shop', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/M.Manze_Bermondsey_-_87_Tower_Bridge_Road_London_SE1_4TW.jpg/330px-M.Manze_Bermondsey_-_87_Tower_Bridge_Road_London_SE1_4TW.jpg', name:'M. Manze', area:'Tower Bridge Road, Bermondsey', pc:'SE1', cat:'works', year:1902, era:'Manze family since 1902',
      lat:51.4975, lon:-0.0813, addr:'87 Tower Bridge Road, SE1 4TW',
      text:'Opened as a pie shop in 1892 and bought in 1902 by Michele Manze, an Italian immigrant who had arrived selling ice cream. The tiled walls, marble counters and pie-and-mash recipe are essentially unchanged since.\n\nStill run by the same family five generations on &mdash; one of the last working examples of a once-common South London institution.' },

    { id:'chaplin-birthplace', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/East_Street_Market_Entry.jpg/330px-East_Street_Market_Entry.jpg', name:'Charlie Chaplin&rsquo;s birthplace', area:'East Street Market, Walworth', pc:'SE17', cat:'plaque', year:1889, era:'Born 16 April 1889',
      lat:51.4885, lon:-0.0925, addr:'East Street Market, SE17 2DL',
      text:'A Southwark Council plaque on the market gate marks the street where Charlie Chaplin was born in 1889 and spent his first years, son of music-hall performers Charles Chaplin Sr and Hannah Hill.\n\nNo birth certificate has ever turned up. The plaque marks a long local tradition rather than a verified address &mdash; Southwark backed the tradition anyway.' },

    { id:'drysdale-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Margaret_Sanger_and_Charles_V._Drysdale_cph.3b18067.jpg/330px-Margaret_Sanger_and_Charles_V._Drysdale_cph.3b18067.jpg', name:'Dr Charles Vickery Drysdale', area:'Walworth', pc:'SE17', cat:'plaque', year:1874, era:'Blue plaque',
      lat:51.4895, lon:-0.0879, addr:'153a East Street, SE17 2SD',
      text:'Drysdale opened Britain&rsquo;s second birth control clinic at this address in 1921, and went on to co-found the Family Planning Association in 1930.\n\nHe was also a working electrical engineer who invented the phase-shifting transformer and served as vice-president of the Institute of Physics &mdash; a scientific career running in parallel with the reform campaigning.' },

    { id:'phyllis-pearsall', img:'https://upload.wikimedia.org/wikipedia/commons/7/7f/London_A_-_Z_-_street_atlas_book_cover.png', name:'Phyllis Pearsall', area:'Court Lane Gardens, East Dulwich', pc:'SE22', cat:'plaque', year:1906, era:'Blue plaque, unveiled 2005',
      lat:51.4515, lon:-0.08, addr:'Court Lane Gardens, SE22',
      text:'Marks the birthplace, in 1906, of the woman who said she walked 3,000 miles of London streets to hand-draw the first A&ndash;Z after getting lost on the way to a party.\n\nHistorians now doubt the solo-walking story, but the A&ndash;Z she published in 1936 shaped how Londoners have found their way round the city ever since.' },

    { id:'tate-modern', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Tate_Modern_-_Bankside_Power_Station.jpg/330px-Tate_Modern_-_Bankside_Power_Station.jpg', name:'Tate Modern', area:'Bankside', pc:'SE1', cat:'art', year:2000, era:'Opened 12 May 2000',
      lat:51.5076, lon:-0.0994, addr:'Bankside, SE1 9TG',
      text:'Giles Gilbert Scott&rsquo;s oil-fired power station stood empty for two decades until Herzog &amp; de Meuron converted it, keeping the ninety-nine-metre chimney and turning the vast turbine hall itself into part of the collection.\n\nLouise Bourgeois opened the first Turbine Hall commission with three towering steel spider-like sculptures. The &pound;134m conversion kept the building&rsquo;s industrial bones so deliberately that first-time visitors often can&rsquo;t tell where the power station ends and the gallery begins.' },

    { id:'south-london-gallery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/London_Bridge_and_The_Shard_-_panoramio.jpg/330px-London_Bridge_and_The_Shard_-_panoramio.jpg', name:'South London Gallery', area:'Peckham Road', pc:'SE5', cat:'art', year:1891, era:'Opened 4 May 1891',
      lat:51.4735, lon:-0.0805, addr:'65 Peckham Road, SE5 8UH',
      text:'Founded by the philanthropist William Rossiter to &ldquo;bring art to the people of south London,&rdquo; it grew out of a free library and art gallery he ran from a Blackfriars Road working men&rsquo;s college.\n\nIt now runs across three borrowed sites &mdash; the original 1891 building, a converted 1867 fire station next door, and a garden space on the Sceaux Gardens estate.' },

    { id:'bold-tendencies', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Frank%27s_Caf%C3%A9%2C_Peckham_-_geograph.org.uk_-_6238619.jpg/330px-Frank%27s_Caf%C3%A9%2C_Peckham_-_geograph.org.uk_-_6238619.jpg', name:'Bold Tendencies', area:'Rye Lane, Peckham', pc:'SE15', cat:'art', year:2007, era:'Founded 2007',
      lat:51.4706, lon:-0.0693, addr:'Multi-storey car park, 95a Rye Lane, SE15 4ST',
      text:'A twenty-three-year-old art history graduate, Hannah Barry, talked her way onto the roof of a derelict 1982 Sainsbury&rsquo;s car park and started staging sculpture and performance there with no funding and no permission to stay.\n\nA five-thousand-name community petition in 2017 persuaded the council to drop the car park from its redevelopment plans entirely &mdash; the temporary use won outright over demolition.' },

    { id:'white-cube-bermondsey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/White_Cube_Bermondsey_%286969207087%29.jpg/330px-White_Cube_Bermondsey_%286969207087%29.jpg', name:'White Cube Bermondsey', area:'Bermondsey Street', pc:'SE1', cat:'art', year:2011, era:'Opened October 2011',
      lat:51.4985, lon:-0.0805, addr:'144&ndash;152 Bermondsey Street, SE1 3TQ',
      text:'Jay Jopling, who founded White Cube in 1993, converted a 1970s warehouse into Europe&rsquo;s biggest commercial gallery &mdash; over 5,000 square metres, including a naturally lit double-height room nicknamed the &ldquo;9x9x9.&rdquo;\n\nIt opened by pairing Damien Hirst with the photographer Andreas Gursky &mdash; fitting, since Hirst is the artist most responsible for Bermondsey&rsquo;s gallery boom in the first place.' },

    { id:'blake-peckham-rye', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Peckham_Rye_Common_-_geograph.org.uk_-_5584059.jpg/330px-Peckham_Rye_Common_-_geograph.org.uk_-_5584059.jpg', name:'William Blake&rsquo;s vision', area:'Peckham Rye Common', pc:'SE15', cat:'art', year:1765, era:'Vision recorded 1765',
      lat:51.4559, lon:-0.0634, addr:'Peckham Rye Common, near Colyton Road, SE15',
      text:'Blake&rsquo;s first biographer records that the poet, aged eight, saw &ldquo;a tree filled with angels, bright angelic wings bespangling every bough like stars&rdquo; on his favourite walk out to Peckham Rye &mdash; the first of the childhood visions that shaped his art.\n\nThe actual oak Blake may have seen is long gone. The tree marking the spot today was replanted in 2011, specifically to give the story a living marker again.' },

    { id:'dilston-grove', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Dilston_Grove_%28former_church%29_-_geograph.org.uk_-_4487372.jpg/330px-Dilston_Grove_%28former_church%29_-_geograph.org.uk_-_4487372.jpg', name:'Dilston Grove', area:'Southwark Park, Rotherhithe', pc:'SE16', cat:'art', year:1911, era:'Rebuilt 1911, gallery since 1999',
      lat:51.4939, lon:-0.0508, addr:'Southwark Park, SE16 2UA',
      text:'Built for a Cambridge college mission in one of the poorest parishes in London, this is thought to be the first poured-concrete building in England &mdash; called &ldquo;the finest modern church in South London&rdquo; when it opened.\n\nIt stood derelict from the 1950s, used informally as sculpture studios by Royal College of Art students, before being converted into a public gallery in 1999.' },

    { id:'apt-gallery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg/330px-Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg', name:'APT Gallery', area:'Deptford Creek', pc:'SE8', cat:'art', year:1995, era:'Founded 1995',
      lat:51.474, lon:-0.0208, addr:'6 Creekside, Harold Wharf, SE8 4SA',
      text:'A group of artists converted a Deptford Creek warehouse into forty-two studios and a public gallery, keeping the working sculpture yard and a stretch of the creek&rsquo;s edge as part of the site.\n\nIts open-submission Creekside Open, running since 2005, is one of the most competitive annual shows for London artists &mdash; and the neighbourhood also hosts Deptford X, London&rsquo;s longest-running artist-led festival, founded in 1998.' },

    { id:'freeze-exhibition', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Surrey_Quays_Road_by_former_dock_offices_-_geograph.org.uk_-_6112428.jpg/330px-Surrey_Quays_Road_by_former_dock_offices_-_geograph.org.uk_-_6112428.jpg', name:'Site of &ldquo;Freeze&rdquo;', area:'Surrey Docks', pc:'SE16', cat:'art', year:1988, era:'Held summer 1988',
      lat:51.493, lon:-0.0483, addr:'Surrey Docks Road, SE16 &mdash; the dockside building itself no longer stands',
      text:'Damien Hirst, then a second-year Goldsmiths student, borrowed an empty Port of London Authority building here for a self-curated show of his own generation: Sarah Lucas, Gary Hume, Michael Landy, Angus Fairhurst and Fiona Rae among them, several taught by Michael Craig-Martin at the college up the road in New Cross.\n\n&ldquo;Freeze&rdquo; is now treated as the founding moment of the Young British Artists. The building is gone, so the story now lives only in the docklands street it once stood on.' },

    { id:'bankside-gallery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/St_Paul%27s_-_Tate_Modern.JPG/330px-St_Paul%27s_-_Tate_Modern.JPG', name:'Bankside Gallery', area:'Hopton Street', pc:'SE1', cat:'art', year:1980, era:'Opened 1980',
      lat:51.507, lon:-0.1015, addr:'48 Hopton Street, SE1 9JH',
      text:'Home of the Royal Watercolour Society &mdash; founded in 1804 by painters who felt snubbed by the Royal Academy &mdash; the gallery sits a few doors from Tate Modern, on the same stretch of bank its founders never got the chance to show on.\n\nIt is one of the only London galleries built specifically to show work on paper, still run today as an artist-membership charity rather than a commercial space.' },

    { id:'peckham-peace-wall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Rye_Lane_in_Peckham._-_geograph.org.uk_-_8189377.jpg/330px-Rye_Lane_in_Peckham._-_geograph.org.uk_-_8189377.jpg', name:'Rye Lane murals', area:'Choumert Grove, Peckham', pc:'SE15', cat:'art', year:2012, era:'Unveiled 2012, extended 2025',
      lat:51.4715, lon:-0.0693, addr:'Rye Lane / Choumert Grove alley, SE15',
      text:'After the 2011 riots, Peckham Platform commissioned artists to turn thousands of the community&rsquo;s hand-written post-it notes of hope into a permanent public wall here; a sixty-metre painted &ldquo;promenade&rdquo; of Rye Lane life was added along the same alley soon after.\n\nThree more murals, on food, music and resistance, were added in July 2025, made with more than twenty local community groups.' },

    { id:'quantum-cloud', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Antony_Gormley_Quantum_Cloud_2000.jpg/330px-Antony_Gormley_Quantum_Cloud_2000.jpg', name:'Quantum Cloud', area:'North Greenwich Pier', pc:'SE10', cat:'art', year:1999, era:'Installed 1999',
      lat:51.5018, lon:0.0091, addr:'River platform off North Greenwich Pier, SE10',
      text:'Antony Gormley&rsquo;s thirty-metre lattice cage, built from scaffolding-pole-like steel rods, holds a human figure only visible from certain angles &mdash; the rest is empty air. It grew out of conversations with a physicist about quantum field theory.\n\nIt is Gormley&rsquo;s tallest work to date, and one of only two of his sculptures sited over open water &mdash; the tide runs through the cage twice a day.' },

    { id:'the-line-here', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Here_24%2C859_-_artwork_%28looking_north%29.jpg/330px-Here_24%2C859_-_artwork_%28looking_north%29.jpg', name:'&ldquo;Here&rdquo;', area:'Olympian Way, Greenwich Peninsula', pc:'SE10', cat:'art', year:2013, era:'Installed 2013',
      lat:51.5031, lon:-0.0014, addr:'Olympian Way, SE10',
      text:'A standard UK road sign reading &ldquo;Here 24,859&rdquo; &mdash; the number is the distance in miles you&rsquo;d travel straight down through the earth and back up the other side to reach this exact point again.\n\nIt sits almost exactly on the Greenwich Meridian itself, making it the one public artwork in London that is genuinely about the number this whole gazetteer is built around.' },

    { id:'liberty-grip', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Greenwich_Thames_Path%2C_Liberty_Grip%2C_Gary_Hume_%281%29.jpg/330px-Greenwich_Thames_Path%2C_Liberty_Grip%2C_Gary_Hume_%281%29.jpg', name:'Liberty Grip', area:'Olympian Way, Greenwich Peninsula', pc:'SE10', cat:'art', year:2008, era:'Cast 2008, sited 2015',
      lat:51.501, lon:0.0048, addr:'Olympian Way, east side of The O2, SE10',
      text:'Gary Hume cast this bronze in three sections, each modelled from a mannequin&rsquo;s arm bent at the elbow &mdash; an abstracted gesture that reads differently walking past it from each direction.\n\nIt was first shown at White Cube Bermondsey in 2013 before this permanent riverside casting joined the Greenwich Peninsula trail two years later.' },

    { id:'slice-of-reality', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/London_MMB_%C2%BB004_Thames_Path.jpg/330px-London_MMB_%C2%BB004_Thames_Path.jpg', name:'A Slice of Reality', area:'Greenwich Peninsula foreshore', pc:'SE10', cat:'art', year:1999, era:'Installed for the Millennium, 1999',
      lat:51.5027, lon:-0.0033, addr:'Thames foreshore, north-west of The O2, SE10',
      text:'Richard Wilson sliced a genuine sixty-metre sand dredger, the Arco Trent, down to a nine-metre cross-section and stood it upright in the tidal mud &mdash; deck, hold, funnel and all, cut through like an architect&rsquo;s model.\n\nIt is one of the only public sculptures in London that behaves differently by the hour: the tide submerges its base twice daily.' },

    { id:'tribe-and-tribulation', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/View_from_a_Gondola_on_the_IFS_Cloud_Cable_Car_%28January_2024%29_44.jpg/330px-View_from_a_Gondola_on_the_IFS_Cloud_Cable_Car_%28January_2024%29_44.jpg', name:'Tribe and Tribulation', area:'Olympian Way, Greenwich Peninsula', pc:'SE10', cat:'art', year:2022, era:'Installed 2022',
      lat:51.5015, lon:0.0025, addr:'Olympian Way, SE10',
      text:'Serge Attukwei Clottey&rsquo;s five-and-a-half-metre totem is built from cubes of reclaimed timber, including planks from Ghanaian fishing boats &mdash; a material history of trade routes running down the same meridian this trail follows.\n\nClottey is best known for stitching sculptures from cut-up yellow plastic jerry cans; this piece swapped plastic for salvaged wood, the first time he had built at this scale in timber.' },

    { id:'assembly-woolwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/%22Assembly%22%2C_by_Peter_Burke%2C_Woolwich_Arsenal_%28geograph_2293655%29.jpg/330px-%22Assembly%22%2C_by_Peter_Burke%2C_Woolwich_Arsenal_%28geograph_2293655%29.jpg', name:'Assembly', area:'Royal Arsenal Riverside', pc:'SE18', cat:'art', year:2001, era:'Cast 2001, installed 2009',
      lat:51.4913, lon:0.0685, addr:'Beside Woolwich Arsenal Pier, SE18 6ND',
      text:'Peter Burke&rsquo;s sixteen larger-than-life cast-iron figures, deliberately repeated and industrially finished, stand as a tribute to the munitions workers once employed a few yards from here.\n\nThe figures were cast in 2001 but sat in storage for eight years before the council finally erected them on this spot in 2009.' },

    { id:'portage-charlton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Charlton_House%2C_Peace_Garden%2C_Portage%27_sculpture.jpg/330px-Charlton_House%2C_Peace_Garden%2C_Portage%27_sculpture.jpg', name:'Portage', area:'Charlton House Peace Garden', pc:'SE7', cat:'art', year:2006, era:'Unveiled 2006',
      lat:51.4818, lon:0.0338, addr:'Peace Garden, Charlton House grounds, SE7 8RE',
      text:'Margaret Higginson&rsquo;s bronze, inspired by Amnesty International&rsquo;s campaign against violence towards women, stands in the walled garden of the Jacobean house next door.\n\nIt shares grounds with a mulberry tree planted around 1608 for James I&rsquo;s failed silk-industry scheme &mdash; the newest and oldest things on the site are metres apart.' },

    { id:'the-picnic-lewisham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Gerda_Rubinstein_1993.jpg/330px-Gerda_Rubinstein_1993.jpg', name:'The Picnic', area:'Conington Road, Lewisham', pc:'SE13', cat:'art', year:1988, era:'Installed 1988',
      lat:51.464, lon:-0.014, addr:'Conington Road, SE13 7LG',
      text:'Gerda Rubinstein &mdash; a Dutch-Jewish sculptor who survived the Holocaust as a child before settling in London &mdash; cast this bronze group of ordinary Lewisham figures sharing a meal, part of a wave of 1980s public-realm commissions.\n\nRubinstein said she sculpted ordinary domestic life partly because she had seen so little of it as a child.' },

    { id:'pensive-girl-catford', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pensive_Girl%2C_by_Gerda_Rubinstein.jpg/330px-Pensive_Girl%2C_by_Gerda_Rubinstein.jpg', name:'Pensive Girl', area:'Outside the Old Town Hall, Catford', pc:'SE6', cat:'art', year:1992, era:'Installed 1992',
      lat:51.4453, lon:-0.0213, addr:'Rushey Green, outside the Old Town Hall, SE6 4RU',
      text:'Also by Gerda Rubinstein: a seated bronze woman, life-sized, looking down in thought on the lawn outside Lewisham&rsquo;s Edwardian Old Town Hall.\n\nIt is one of two Rubinstein bronzes in the borough &mdash; a rare case of one sculptor given two separate public commissions streets apart.' },

    { id:'camberwell-college', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Camberwell_Art_School.jpg/330px-Camberwell_Art_School.jpg', name:'Camberwell College of Arts', area:'Peckham Road, Camberwell', pc:'SE5', cat:'art', year:1898, era:'Founded 1898',
      lat:51.4746, lon:-0.0895, addr:'45&ndash;65 Peckham Road, SE5 8UF',
      text:'Founded by the London County Council in 1898, the school became, under principal William Johnstone from 1938, the base for the &ldquo;Camberwell School&rdquo; &mdash; Victor Pasmore, William Coldstream and Claude Rogers regrouping here, and training Terry Frost, Euan Uglow and Gillian Ayres.\n\nIt is now part of University of the Arts London, but its postwar reputation was built almost entirely inside this one Peckham Road building.' },

    { id:'albert-mckenzie-vc', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Albert_Edward_Mckenzie_statue.jpg/330px-Albert_Edward_Mckenzie_statue.jpg', name:'Albert McKenzie VC', area:'Tower Bridge Road, Bermondsey', pc:'SE1', cat:'memory', year:1918, era:'Unveiled 2015',
      lat:51.497, lon:-0.0805, addr:'Tower Bridge Road at Grange Road, SE1 4TU',
      text:'A bronze statue on a plinth shaped to evoke the Zeebrugge harbour wall commemorates Albert McKenzie, an eighteen-year-old Bermondsey sailor awarded the Victoria Cross for a 1918 raid on the Belgian coast &mdash; voted for by his own crewmates, under a since-discontinued rule allowing sailors to nominate one of their own. He died of influenza the following year, aged nineteen.\n\nIt was unveiled on what would have been his 117th birthday, with a twenty-one-gun salute fired from HMS Belfast, moored nearby on the Thames.' },

    { id:'st-saviours-war-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/War_memorial_on_Borough_High_Street%2C_south_London_-_geograph.org.uk_-_1522091.jpg/330px-War_memorial_on_Borough_High_Street%2C_south_London_-_geograph.org.uk_-_1522091.jpg', name:'St Saviour&rsquo;s War Memorial', area:'Borough High Street', pc:'SE1', cat:'memory', year:1922, era:'Unveiled 16 Nov 1922',
      lat:51.5013, lon:-0.091, addr:'Borough High Street, near Talbot Yard, SE1 1LB',
      text:'A bronze soldier on a Portland stone pedestal, modelled by Philip Lindsey Clark, who served through the war himself and finished it a captain with a DSO. Reliefs on the pedestal show biplanes and battleships on the long sides, Saint George and the Dragon and a mourning woman with a child on the ends.\n\nIt was upgraded from Grade II to Grade II* listed in 2018 &mdash; a rare rating for a parish war memorial.' },

    { id:'southwark-gateway-needle', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/John_Keats_at_Guy%27s_Hospital%2C_London_%2812375849294%29.jpg/330px-John_Keats_at_Guy%27s_Hospital%2C_London_%2812375849294%29.jpg', name:'Southwark Gateway Needle', area:'Duke Street Hill, London Bridge', pc:'SE1', cat:'art', year:1999, era:'Installed 1999',
      lat:51.5065, lon:-0.088, addr:'Duke Street Hill, SE1 9SA',
      text:'A tapering stainless-steel spike by Eric Parry Architects marks the south end of London Bridge &mdash; a deliberate, uneasy echo of the iron spikes that once held the severed heads of traitors executed at the Tower and displayed on the old bridge for centuries.\n\nIt was commissioned as part of a Millennium-era gateway project meant to announce Southwark&rsquo;s side of the river without pretending its history was gentler than it was.' },

    { id:'mandela-way-tank', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Stompie_Nov_2020_%281%29.jpg/330px-Stompie_Nov_2020_%281%29.jpg', name:'The Mandela Way tank', area:'Bermondsey', pc:'SE1', cat:'memory', year:1995, era:'Parked since 1995',
      lat:51.4928, lon:-0.0748, addr:'Corner of Mandela Way and Page&rsquo;s Walk, SE1 4HP',
      text:'A decommissioned Soviet-era T-34 tank, once used by Czechoslovak forces during the 1968 Prague Spring and later a film prop, has sat on this vacant plot since 1995 &mdash; placed there, gun turret pointed at Southwark Council&rsquo;s planning offices, after the council rejected the owner&rsquo;s redevelopment plans.\n\nLocal legend holds he first told the council he had permission for a &ldquo;tank&rdquo; on the site and officials assumed he meant a septic tank. It was removed for restoration in 2022 and may not return &mdash; check before you go; this may already be history rather than a sight to see.' },

    { id:'dulwich-outdoor-gallery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/%27Fight_Club%27_by_Conor_Harrington_based_on_%27Massacre_of_the_Innocents%27_by_Charles_Le_Brun_in_Dulwich_Picture_Gallery.jpg/330px-%27Fight_Club%27_by_Conor_Harrington_based_on_%27Massacre_of_the_Innocents%27_by_Charles_Le_Brun_in_Dulwich_Picture_Gallery.jpg', name:'Dulwich Outdoor Gallery', area:'Dulwich Village', pc:'SE21', cat:'art', year:2012, era:'Begun 2012',
      lat:51.4468, lon:-0.087, addr:'Dulwich Village and surrounding streets, SE21',
      text:'Ingrid Beazley of Dulwich Picture Gallery invited the street artist Stik to repaint an Old Master from the gallery&rsquo;s collection onto a garage door nearby; a dozen more international artists have since reimagined Baroque paintings as murals across the village.\n\nOne mural is built deliberately around a gas meter box. It turns the whole village into a free, outdoor annexe of the gallery a few streets away, repainted whenever an artist proposes something new.' },

    { id:'sands-films-studio', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grices_Granary_Film_Studios%2C_Rotherhithe_%28Northeast_Corner_-_01%29.jpg/330px-Grices_Granary_Film_Studios%2C_Rotherhithe_%28Northeast_Corner_-_01%29.jpg', name:'Sands Films Studio', area:'St Marychurch Street, Rotherhithe', pc:'SE16', cat:'art', year:1976, era:'Studio since 1976',
      lat:51.5004, lon:-0.0525, addr:'Grice&rsquo;s Granary, 82 St Marychurch Street, SE16 4HZ',
      text:'A Georgian riverside granary, its beams reused from old ship timbers, became a working film studio in 1976, founded by producer Richard Goodwin and director Christine Edzard. It has built costumes for Les Mis&eacute;rables, Wolf Hall and Bright Star, and holds a private research library of visual reference used across the industry.\n\nEdzard filmed her own 1987 adaptation of Dickens&rsquo;s Little Dorrit inside the building &mdash; a novel largely set in a debtors&rsquo; prison a few miles upriver in Southwark.' },

    { id:'deal-porters', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Deal_Porters_by_Philip_Bews.jpg/330px-Deal_Porters_by_Philip_Bews.jpg', name:'The Deal Porters', area:'Canada Water', pc:'SE16', cat:'art', year:1990, era:'Installed 1990',
      lat:51.4977, lon:-0.0489, addr:'Surrey Quays Road, SE16',
      text:'A sculptural group recalls the deal porters &mdash; dockers who once carried sawn Baltic softwood (&ldquo;deal&rdquo;) across these docks strapped to leather-padded shoulder hooks, a trade that gave Rotherhithe&rsquo;s timber wharves their name and vanished when the docks closed in the 1970s.\n\nThe sculpture stands within sight of the water it replaced: Canada Water itself is one of the old Surrey Commercial Docks basins, kept as a lake once the trade that dug it disappeared.' },

    { id:'norwegian-seamens-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Norwegian_Church_%28St_Olavs%29_-_Albion_Street%2C_Rotherhithe%2C_SE16_-_geograph.org.uk_-_1482595.jpg/330px-Norwegian_Church_%28St_Olavs%29_-_Albion_Street%2C_Rotherhithe%2C_SE16_-_geograph.org.uk_-_1482595.jpg', name:'Norwegian Seamen&rsquo;s War Memorial', area:'St Olav&rsquo;s Square, Rotherhithe', pc:'SE16', cat:'memory', year:1927, era:'Unveiled 1927',
      lat:51.4986, lon:-0.0526, addr:'St Olav&rsquo;s Church, St Olav&rsquo;s Square, SE16 2XB',
      text:'Built for London&rsquo;s Norwegian community, St Olav&rsquo;s became the church of King Haakon VII and his government-in-exile through the Second World War; its memorial, unveiled in 1927 by the future King Olav V, honours the roughly 2,100 Norwegian merchant seamen killed in the First World War alone.\n\nThe churchyard was rebuilt in 2017 and reopened by Princess Astrid of Norway &mdash; one of the few places in London where a foreign head of state&rsquo;s wartime exile is marked at street level.' },

    { id:'george-webster-fountain', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/College_of_God%E2%80%99s_Gift%2C_Dr_Webster%E2%80%99s_Fountain_and_Old_Grammar_School%2C_Dulwich.jpg/330px-College_of_God%E2%80%99s_Gift%2C_Dr_Webster%E2%80%99s_Fountain_and_Old_Grammar_School%2C_Dulwich.jpg', name:'George Webster Fountain', area:'Dulwich Village', pc:'SE21', cat:'memory', year:1876, era:'Erected 1876',
      lat:51.4468, lon:-0.0868, addr:'Dulwich Village, SE21',
      text:'A drinking fountain paid for by public subscription honours Dr George Webster, the village GP for thirty years until his death in 1876 &mdash; a small, unshowy memorial from neighbours rather than any institution.\n\nIt was restored in 1977 for the Queen&rsquo;s Silver Jubilee, a century after it first went up, by the same kind of local, voluntary effort that built it.' },

    { id:'jabez-west-fountain', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Jabez_West_Drinking_Fountain%2C_Southwark_Park_%2801%29.jpg/330px-Jabez_West_Drinking_Fountain%2C_Southwark_Park_%2801%29.jpg', name:'Jabez West Fountain', area:'Southwark Park', pc:'SE16', cat:'memory', year:1885, era:'Unveiled 3 April 1885',
      lat:51.4939, lon:-0.0517, addr:'Southwark Park, SE16 2UA',
      text:'A drinking fountain commemorates Jabez West, a Bermondsey tanner and temperance campaigner, placed in the park specifically to offer thirsty visitors water instead of the pub.\n\nIt sits a short walk from Dilston Grove, a former mission church in the same park now serving as a public art gallery.' },

    { id:'booth-statues', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/William_Booth.jpg/330px-William_Booth.jpg', name:'William &amp; Catherine Booth', area:'Champion Park, Denmark Hill', pc:'SE5', cat:'memory', year:1929, era:'Unveiled 1929',
      lat:51.47, lon:-0.0908, addr:'Champion Park, Denmark Hill, SE5 8BQ',
      text:'Grade II-listed bronzes of the founders of the Salvation Army stand outside the William Booth Memorial Training College, itself designed by Giles Gilbert Scott &mdash; the same architect later responsible for converting Bankside Power Station into Tate Modern.\n\nBooth wrote much of his manifesto, In Darkest England, after working the streets of this same stretch of South London.' },

    { id:'damilola-taylor-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Damilola_Taylor_memorial.jpg/330px-Damilola_Taylor_memorial.jpg', name:'Damilola Taylor memorial', area:'Oliver Goldsmith School, Peckham', pc:'SE5', cat:'memory', year:2002, era:'Unveiled 2002',
      lat:51.4746, lon:-0.0866, addr:'Oliver Goldsmith Primary School, 83 Peckham Road, SE5 8UH',
      text:'A small sculpture of a phoenix taking flight was unveiled at his former primary school in memory of Damilola Taylor, a ten-year-old who died in 2000 after being attacked on a stairwell on the nearby North Peckham estate, days after arriving in London from Nigeria.\n\nA second, larger memorial garden is now planned for a rebuilt Peckham Square nearby, expected to open in 2027 &mdash; this quiet school sculpture may end up the earlier of two.' },

    { id:'camberwell-beauty-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/St_Giles_Church_Camberwell_2000.jpg/330px-St_Giles_Church_Camberwell_2000.jpg', name:'Camberwell Beauty mural', area:'Wells Way, Camberwell', pc:'SE5', cat:'art', year:1920, era:'Installed c.1920',
      lat:51.4735, lon:-0.087, addr:'Wells Way, SE5',
      text:'A large Doulton faience tile mural of the Camberwell Beauty &mdash; a butterfly first recorded in Britain in this parish in 1748, and the source of Camberwell&rsquo;s own civic emblem &mdash; decorates a wall on Wells Way.\n\nThe butterfly itself hasn&rsquo;t bred in Britain for decades. It survives here only as decoration, on a building that has outlasted the insect it&rsquo;s named after.' },

    { id:'bluecoat-boy-girl', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/St._Mary_Rotherhithe_%28former%29_charity_school_-_Bluecoat_boy_statue_-_geograph.org.uk_-_2694749.jpg/330px-St._Mary_Rotherhithe_%28former%29_charity_school_-_Bluecoat_boy_statue_-_geograph.org.uk_-_2694749.jpg', name:'The Bluecoat Boy &amp; Girl', area:'St Marychurch Street, Rotherhithe', pc:'SE16', cat:'culture', year:1613, era:'School founded 1613',
      lat:51.5008, lon:-0.0522, addr:'St Marychurch Street, SE16 4JE',
      text:'Two painted figures of a charity-school boy and girl in blue-coat uniform look down from a wall beside St Mary&rsquo;s Church &mdash; survivors of the free school founded here in 1613 to educate the children of Rotherhithe watermen and sailors.\n\nThey stand almost exactly where the Mayflower left the Thames in 1620, a reminder that this stretch of river was a working parish long before it became a heritage postcard.' },

    { id:'george-ii-statue', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Statue_of_George_III%2C_Pall_Mall_SW1.jpg/330px-Statue_of_George_III%2C_Pall_Mall_SW1.jpg', name:'George II statue', area:'Old Royal Naval College', pc:'SE10', cat:'memory', year:1735, era:'Carved 1735',
      lat:51.4832, lon:-0.007, addr:'Grand Square, Old Royal Naval College, SE10 9NN',
      text:'Rysbrack carved this from a single eleven-tonne block of Carrara marble, seized from a French ship by Admiral George Rooke and originally destined to become a statue of Louis XIV.\n\nGreenwich Hospital acquired the marble in 1714 and put up George II instead in 1735, likely hoping to flatter the King into becoming the hospital&rsquo;s patron.' },

    { id:'william-iv-statue', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/King_William_IV_statue_%288844765795%29.jpg/330px-King_William_IV_statue_%288844765795%29.jpg', name:'William IV statue', area:'Greenwich Park', pc:'SE10', cat:'memory', year:1844, era:'Moved here 1935',
      lat:51.4785, lon:-0.0089, addr:'King William Walk, SE10 8QY',
      text:'Samuel Nixon&rsquo;s statue originally stood at the north end of London Bridge, then outside the Royal Exchange, before Greenwich took it in 1935 after the church earmarked for the site was demolished.\n\nIt is one of the few London statues to have had three different addresses before finding a permanent home.' },

    { id:'nelson-statue-greenwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Statue_of_Nelson%2C_Trafalgar_Tavern%2C_Greenwich_-_geograph.org.uk_-_1701462.jpg/330px-Statue_of_Nelson%2C_Trafalgar_Tavern%2C_Greenwich_-_geograph.org.uk_-_1701462.jpg', name:'Lord Nelson statue', area:'Trafalgar Tavern, Greenwich', pc:'SE10', cat:'maritime', year:2005, era:'Unveiled 2005',
      lat:51.485, lon:-0.0068, addr:'Park Row, SE10 9NW',
      text:'Sculptor Lesley Pover spent two years working from Nelson&rsquo;s life mask and Maritime Museum archives; the tavern&rsquo;s owner commissioned it for the battle&rsquo;s two-hundredth anniversary, and it was unveiled in 2005.\n\nIt was removed for a year after a 2012 vandalism incident left it tilted, apparently from a bungled theft attempt, and had to be repaired before its return.' },

    { id:'peter-the-great-deptford', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Statue_of_Peter_the_Great_on_Glaisher_Street_%28geograph_3480160%29.jpg/330px-Statue_of_Peter_the_Great_on_Glaisher_Street_%28geograph_3480160%29.jpg', name:'Peter the Great statue', area:'Glaisher Street, Deptford', pc:'SE8', cat:'art', year:2001, era:'Unveiled June 2001',
      lat:51.4855, lon:-0.023, addr:'Glaisher Street, SE8 3EH',
      text:'Mihail Chemiakin&rsquo;s bronze gift from the Russian people shows an oddly small-headed Tsar with pipe and telescope, flanked by a dwarf, cannon and sea-monster heads &mdash; commemorating Peter&rsquo;s 1698 stay nearby to study shipbuilding at the Deptford dockyards.\n\nIt regularly tops lists of London&rsquo;s strangest public sculpture. The real Peter, six foot eight, reportedly hated his own portraits for making him look ordinary.' },

    { id:'wellington-statue-woolwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/London%2C_UK_%28August_2014%29_-_175.JPG/330px-London%2C_UK_%28August_2014%29_-_175.JPG', name:'Duke of Wellington statue', area:'Royal Arsenal riverside', pc:'SE18', cat:'memory', year:1848, era:'Moved here 2005',
      lat:51.492, lon:0.0705, addr:'Royal Arsenal riverside, SE18 6ND',
      text:'Erected to honour Wellington&rsquo;s decades as Master-General of the Ordnance, overseeing the Arsenal&rsquo;s guns; it was moved to a lawn above a car park in 2005 as the old munitions site was redeveloped into flats.\n\nThe Iron Duke now watches over exactly the kind of riverside apartments his own ordnance works helped make necessary to clear.' },

    { id:'woolwich-town-hall-windows', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Woolwich_town_hall_1.jpg/330px-Woolwich_town_hall_1.jpg', name:'Woolwich Town Hall windows', area:'Wellington Street, Woolwich', pc:'SE18', cat:'grand', year:1906, era:'Built 1903&ndash;1906',
      lat:51.49, lon:0.0645, addr:'Wellington Street, SE18 6PW',
      text:'Geoffrey Webb&rsquo;s stained glass fills the building with scenes from Woolwich, Plumstead and Eltham history &mdash; three foreign kings entertained at Eltham Palace in 1374, and the warship Henry Grace &agrave; Dieu launching from Woolwich Dockyard in 1514.\n\nOne window pictures Thomas More&rsquo;s daughter Margaret Roper &mdash; the same Roper who, this gazetteer&rsquo;s Eltham entry notes, is said to have brought her father&rsquo;s head back to Well Hall after his execution.' },

    { id:'lewisham-clock-tower', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Joe_lew_%281%29.jpg/330px-Joe_lew_%281%29.jpg', name:'Lewisham Clock Tower', area:'Lewisham High Street', pc:'SE13', cat:'grand', year:1897, era:'Built 1897',
      lat:51.4615, lon:-0.0155, addr:'Rennell Street junction, SE13 5JH',
      text:'Raised to mark Queen Victoria&rsquo;s Diamond Jubilee, it has stood at this crossroads through the town centre&rsquo;s every rebuilding since.\n\nIt is one of dozens of near-identical jubilee clock towers put up across Britain in 1897 &mdash; Lewisham&rsquo;s has simply outlasted more of its high street than most.' },

    { id:'lewisham-war-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Joe_lew_%281%29.jpg/330px-Joe_lew_%281%29.jpg', name:'Lewisham War Memorial', area:'Lewisham War Memorial Gardens', pc:'SE13', cat:'memory', year:1921, era:'Unveiled 1921',
      lat:51.461, lon:-0.016, addr:'Rennell Street, SE13 5EZ',
      text:'Six plaques set into the ground name Lewisham&rsquo;s Victoria Cross holders, among them Major Francis Harvey, mortally wounded at Jutland in 1916, who used his last minutes to order his ship&rsquo;s magazine flooded and save HMS Lion from exploding.\n\nA separate Lewisham VC memorial was added nearby as recently as 2015 &mdash; a century on, the borough was still adding names to its own roll of honour.' },

    { id:'deptford-war-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg/330px-Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg', name:'Deptford war memorial', area:'St Paul&rsquo;s Churchyard, Deptford', pc:'SE8', cat:'memory', year:1924, era:'Unveiled 1924',
      lat:51.4795, lon:-0.0265, addr:'Deptford High Street, SE8 3DP',
      text:'Two bronze figures, a soldier and a sailor with arms reversed and heads bowed, flank a Portland stone shaft reading &ldquo;Deptford&rsquo;s tribute to her gallant sons who were faithful unto death.&rdquo;\n\nDeptford&rsquo;s dockyard past put both services on the same plinth &mdash; an unusually direct memorial to how the borough actually made its living.' },

    { id:'blackheath-war-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Blackheath_village.jpg/330px-Blackheath_village.jpg', name:'Blackheath war memorial', area:'Blackheath', pc:'SE3', cat:'memory', year:1921, era:'Unveiled 1921',
      lat:51.47, lon:0.002, addr:'Maze Hill / Charlton Way, SE3',
      text:'Beneath the Borough of Greenwich&rsquo;s coat of arms, it names more than 1,600 men of the borough killed in the Great War, with a later inscription added for the dead of 1939&ndash;45.\n\nIt stands on the same open heath where, this gazetteer&rsquo;s Blackheath entry already notes, medieval rebels once mustered to march on London.' },

    { id:'charlton-war-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Charlton_war_memorial_-_geograph.org.uk_-_971762.jpg/330px-Charlton_war_memorial_-_geograph.org.uk_-_971762.jpg', name:'Charlton war memorial', area:'St Luke&rsquo;s Church, Charlton', pc:'SE7', cat:'memory', year:1921, era:'Unveiled 1921',
      lat:51.4845, lon:0.0365, addr:'Charlton Village, SE7 8QT',
      text:'Its panels list 248 names from both world wars; a separate memorial at Charlton Athletic&rsquo;s Valley ground names the club&rsquo;s own players, officials and supporters killed in service.\n\nA local football club keeping its own war memorial, distinct from the parish one a few streets away, is a rarer thing than it sounds.' },

    { id:'forest-hill-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/London%2C_Forest_Hill_Library.jpg/330px-London%2C_Forest_Hill_Library.jpg', name:'Forest Hill canal mural', area:'Davids Road, Forest Hill', pc:'SE23', cat:'art', year:2003, era:'Painted 2003',
      lat:51.439, lon:-0.053, addr:'Davids Road, SE23 3EP',
      text:'Council-commissioned artwork sits on a wall that is itself a survivor: the raised path beneath it was the towpath of the Croydon Canal, drained in 1836 so the London and Croydon Railway could be laid on top.\n\nThe mural depicts its own site&rsquo;s history in miniature &mdash; a hump-backed canal bridge with a barge passing beneath it, painted directly onto the wall that used to be the towpath.' },

    { id:'bexleyheath-clock-tower', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/The_Clocktower_at_Bexleyheath.jpg/330px-The_Clocktower_at_Bexleyheath.jpg', name:'Bexleyheath Clock Tower', area:'The Broadway, Bexleyheath', pc:'DA6', cat:'grand', year:1912, era:'Opened 17 July 1912',
      lat:51.463, lon:0.15, addr:'The Broadway, DA6 7JJ',
      text:'Built for George V&rsquo;s coronation, its niches were meant to hold four busts; the original plaster George V disintegrated during cleaning in 1935 and had to be recast, and a matching bust of William Morris &mdash; who lived up the road at Red House &mdash; was added in 1997.\n\nOne niche has stood empty since 1912. The tower has spent longer waiting to be finished than it took to build.' },

    { id:'brockley-jack', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/The_Brockley_Jack_pub%2C_Crofton_Park.jpg/330px-The_Brockley_Jack_pub%2C_Crofton_Park.jpg', name:'The Brockley Jack', area:'Brockley Road', pc:'SE4', cat:'pub', year:1863, era:'Renamed 1863, rebuilt 1898',
      lat:51.4555, lon:-0.0335, addr:'408 Brockley Road, SE4 2DH',
      text:'Renamed in 1863 for the local highwayman &ldquo;Black&rdquo; Jack Law, on the site of an older inn known through the eighteenth century as the Crooked Billet and later the Castle. It was rebuilt in more substantial brick and stone in 1898.\n\nA whale&rsquo;s shoulder bone, once used as the pub sign, still projects near the roofline. It now shares its building with the Brockley Jack Studio Theatre.' },

    { id:'sylvan-post', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Sydenham_Avenue_SE26.JPG/330px-Sydenham_Avenue_SE26.JPG', name:'The Sylvan Post', area:'Dartmouth Road, Forest Hill', pc:'SE23', cat:'pub', year:1960, era:'A 1960s post office, now a pub',
      lat:51.438, lon:-0.0545, addr:'24&ndash;28 Dartmouth Road, SE23 3XU',
      text:'A working post office until Antic converted it into a pub, keeping the old strong room as a snug and hanging the walls with postal memorabilia &mdash; franked stamps, telegrams, sorting-office ephemera.\n\nPortobello Brewery took it over in late 2020. The counter where locals once queued for stamps and pensions is now where they queue for real ale.' },

    { id:'rivoli-ballroom', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rivoli_Ballroom%2C_Brockley%2C_SE4.jpg/330px-Rivoli_Ballroom%2C_Brockley%2C_SE4.jpg', name:'Rivoli Ballroom', area:'Crofton Park', pc:'SE4', cat:'culture', year:1913, era:'Cinema 1913, ballroom since 1959',
      lat:51.4525, lon:-0.0335, addr:'350 Brockley Road, SE4 2BY',
      text:'Opened in July 1913 as the Crofton Park Picture Palace, Lewisham&rsquo;s eighteenth cinema, with live orchestrion music; it closed as a cinema in 1957 and reopened two years later as a dance hall with a sprung Canadian maple floor.\n\nIt is the only intact 1950s ballroom interior left in London &mdash; red flock wallpaper, chandeliers and all, largely unchanged since Boxing Day 1959.' },

    { id:'ivy-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Ivy_House%2C_Nunhead%2C_SE15_%285478867910%29.jpg/330px-Ivy_House%2C_Nunhead%2C_SE15_%285478867910%29.jpg', name:'The Ivy House', area:'Stuart Road, Nunhead', pc:'SE15', cat:'pub', year:1930, era:'Rebuilt 1930s, community-owned since 2013',
      lat:51.4635, lon:-0.057, addr:'40 Stuart Road, SE15 3BE',
      text:'Rebuilt by Truman&rsquo;s as a Grade II-listed &ldquo;improved public house&rdquo; on the site of the older Newlands Tavern, it became London&rsquo;s first co-operatively owned pub after Enterprise Inns evicted its tenants in 2012 to sell it for flats.\n\nA Nunhead campaign got it listed as the UK&rsquo;s first Asset of Community Value, then bought the freehold outright within twelve months under the Localism Act &mdash; it reopened, community-run, in summer 2013.' },

    { id:'st-peters-brockley', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Brockley_station_eastern_entrance_2012.JPG/330px-Brockley_station_eastern_entrance_2012.JPG', name:'St Peter&rsquo;s Church', area:'Wickham Road, Brockley', pc:'SE4', cat:'grand', year:1870, era:'Built 1866&ndash;1870',
      lat:51.4645, lon:-0.029, addr:'Wickham Road, SE4 1QW',
      text:'Frederick Marrable&rsquo;s church anchors the east side of Wickham Road, the spine of the Brockley conservation area&rsquo;s run of Gothic Revival villas and terraces built for commuters once the railway reached Brockley in the 1870s.\n\nIt has almost no churchyard and no burials &mdash; unusual for a Victorian parish church, and a sign of how tightly the surrounding streets were already built up when it went up.' },

    { id:'brockley-cemeteries', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ladywell_and_Brockley_cemetery_-_geograph.org.uk_-_1290119.jpg/330px-Ladywell_and_Brockley_cemetery_-_geograph.org.uk_-_1290119.jpg', name:'Brockley &amp; Ladywell Cemeteries', area:'Brockley', pc:'SE4', cat:'green', year:1858, era:'Opened 1858',
      lat:51.458, lon:-0.0245, addr:'Brockley Road, SE4 2PU',
      text:'Two adjoining Victorian cemeteries opened almost simultaneously in 1858, the first replacing an overflowing parish burial ground at St Paul&rsquo;s Deptford &mdash; a common pattern as inner London&rsquo;s churchyards filled up faster than its population could be buried.\n\nTogether they now form one continuous green corridor, headstones and mature trees standing where two separate parishes once kept their dead strictly apart.' },

    { id:'maunders-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/WALTER_MAUNDER_1851%E2%80%931928_ANNIE_MAUNDER_1868%E2%80%931947_Astronomers_lived_here_1907%E2%80%931911.jpg/330px-WALTER_MAUNDER_1851%E2%80%931928_ANNIE_MAUNDER_1868%E2%80%931947_Astronomers_lived_here_1907%E2%80%931911.jpg', name:'Walter &amp; Annie Maunder', area:'Tyrwhitt Road, Brockley', pc:'SE4', cat:'plaque', year:1907, era:'Blue plaque, unveiled 2022',
      lat:51.4655, lon:-0.0295, addr:'69 Tyrwhitt Road, SE4 1QE',
      text:'English Heritage&rsquo;s plaque marks the house where the astronomer couple lived from 1907 to 1911, working on solar eclipses and sunspot cycles and writing popular guides that helped debunk the era&rsquo;s fashionable myth of canals on Mars.\n\nAnnie, a mathematician barred from a formal Royal Observatory post because she was a woman, worked there anyway as a low-paid &ldquo;lady computer&rdquo; &mdash; the plaque was part of a deliberate 2022 push by English Heritage to mark more women&rsquo;s and working-class history.' },

    { id:'amersham-arms', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amersham_Arms%2C_New_Cross%2C_SE14_%282539642574%29.jpg/330px-Amersham_Arms%2C_New_Cross%2C_SE14_%282539642574%29.jpg', name:'The Amersham Arms', area:'New Cross Road', pc:'SE14', cat:'pub', year:1850, era:'Pub since the 1850s',
      lat:51.4755, lon:-0.0355, addr:'388 New Cross Road, SE14 6TY',
      text:'A pub has stood on this stretch of New Cross Road since at least the 1850s, trading for two decades from the 1920s as the Amersham Hotel before reverting to its old name.\n\nA large illuminated &ldquo;Take Courage&rdquo; sign still runs down one wall. It&rsquo;s now one of New Cross&rsquo;s working live-music pubs, a few hundred yards from the Goldsmiths building that trained the students who once drank in it.' },

    { id:'tyrwhitt-villas', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Brockley_station_eastern_entrance_2012.JPG/330px-Brockley_station_eastern_entrance_2012.JPG', name:'Tyrwhitt Road villas', area:'Brockley', pc:'SE4', cat:'grand', year:1880, era:'Developed 1870s&ndash;1900',
      lat:51.465, lon:-0.03, addr:'Tyrwhitt Road, SE4 1QE',
      text:'The Tyrwhitt-Drake family developed north Brockley&rsquo;s grand villas, terraces and semi-detached houses through the late nineteenth century &mdash; Tyrwhitt Road and neighbouring Drake Road both carry the family name, with Chalsey Road the last to be finished, in 1900.\n\nIt&rsquo;s now one of inner London&rsquo;s most complete Victorian suburbs, protected since 1974 by both a conservation area designation and the volunteer Brockley Society founded that same year.' },

    { id:'peckham-library', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/DSCN4087.JPG/330px-DSCN4087.JPG', name:'Peckham Library', area:'Peckham Hill Street', pc:'SE15', cat:'grand', year:2000, era:'Won the Stirling Prize, 2000',
      lat:51.4733, lon:-0.0692, addr:'122 Peckham Hill Street, SE15 5JR',
      text:'Will Alsop&rsquo;s design suspends the main reading room on a cantilevered steel-framed plane, shaped like an inverted &ldquo;L&rdquo; on thin columns set at deliberately random angles, clad in pre-patinated copper.\n\nIt became the first &mdash; and so far only &mdash; library ever to win the Stirling Prize, Britain&rsquo;s top architecture award, sharing that year&rsquo;s Civic Trust Award with only Tate Modern and the London Eye.' },

    { id:'deptford-town-hall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Deptford_Town_Hall_from_the_Northwest_%2801%29.jpg/330px-Deptford_Town_Hall_from_the_Northwest_%2801%29.jpg', name:'Deptford Town Hall', area:'New Cross Road', pc:'SE14', cat:'grand', year:1905, era:'Built 1903&ndash;1907, opened 1905',
      lat:51.4757, lon:-0.0357, addr:'New Cross Road, SE14 6AF',
      text:'Built for the Metropolitan Borough of Deptford in Edwardian Baroque, its facade carries carved Tritons, a ship&rsquo;s-prow relief window and a pediment depicting a naval battle &mdash; chosen because Deptford&rsquo;s own Royal Dockyard had closed less than forty years before the building opened.\n\nIts rooftop ship weathervane was stolen during 1994 renovation work and had to be replaced. Goldsmiths, University of London acquired the whole building in 2000.' },

    { id:'montague-arms', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Montague_Arms%2C_Peckham%2C_SE15_%282388671208%29.jpg/330px-Montague_Arms%2C_Peckham%2C_SE15_%282388671208%29.jpg', name:'The Montague Arms', area:'Queens Road, Peckham', pc:'SE15', cat:'pub', year:1868, era:'Pub since 1868, closed 2019',
      lat:51.4715, lon:-0.0625, addr:'289 Queens Road, SE15 2PA',
      text:'A pub of this name stood on Queen&rsquo;s Road from at least 1868; the current building went up around 1928&ndash;29 for Truman&rsquo;s, and for half a century it ran as a family-run cult music venue known for its eccentric decor &mdash; a stuffed zebra riding a Victorian carriage, an old diving suit, fishing-boat lights.\n\nIt closed for good on 1 October 2019 and the taxidermy collection was auctioned off &mdash; worth knowing as a landmark to look for rather than a pub you can still drink in. Check current status before making a special trip.' },

    { id:'blackheath-halls', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Blackheath_Concert_Hall_%28West_Face_-_01%29.jpg/330px-Blackheath_Concert_Hall_%28West_Face_-_01%29.jpg', name:'Blackheath Halls', area:'Lee Road, Blackheath', pc:'SE3', cat:'culture', year:1895, era:'Built 1895&ndash;96',
      lat:51.4665, lon:0.0095, addr:'23 Lee Road, SE3 9RQ',
      text:'Built by public subscription for the Blackheath Conservatoire of Music, founded in 1881, this Grade II-listed hall and its adjoining Conservatoire form London&rsquo;s oldest surviving purpose-built arts complex.\n\nThe 1,200-seat hall still hosts concerts today, over 130 years after local residents first paid for it themselves.' },

    { id:'royal-artillery-barracks', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Royal_Artillery_Barracks_Woolwich_MOD_45155221.jpg/330px-Royal_Artillery_Barracks_Woolwich_MOD_45155221.jpg', name:'Royal Artillery Barracks', area:'Grand Depot Road, Woolwich', pc:'SE18', cat:'grand', year:1802, era:'Built 1775&ndash;1802',
      lat:51.487, lon:0.063, addr:'Grand Depot Road, SE18 6ST',
      text:'James Wyatt&rsquo;s facade runs over 300 metres &mdash; the longest continuous Georgian building front in the country &mdash; built for the Board of Ordnance and home to the Royal Artillery from 1776 until 2007.\n\nIt once housed up to 4,000 men behind that single unbroken frontage.' },

    { id:'st-giles-camberwell', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/South_Face_of_the_Church_of_Saint_Giles%2C_Camberwell_%2805%29.jpg/330px-South_Face_of_the_Church_of_Saint_Giles%2C_Camberwell_%2805%29.jpg', name:'St Giles&rsquo; Church', area:'Camberwell Church Street', pc:'SE5', cat:'grand', year:1844, era:'Built 1842&ndash;44',
      lat:51.4735, lon:-0.0925, addr:'Camberwell Church Street, SE5 8TR',
      text:'Sir George Gilbert Scott&rsquo;s first major Gothic building, built after fire destroyed the medieval church in 1841; its stained glass includes windows made by a young John Ruskin, then a local resident.\n\nScott&rsquo;s original Caen stone facing decayed so badly in London&rsquo;s pollution that he paid to have the church reclad in Portland stone at his own expense.' },

    { id:'camberwell-town-hall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Southwark_town_hall_1.jpg/330px-Southwark_town_hall_1.jpg', name:'Camberwell Town Hall', area:'Peckham Road, Camberwell', pc:'SE5', cat:'grand', year:1934, era:'Opened 10 October 1934',
      lat:51.4744, lon:-0.0895, addr:'Peckham Road, SE5 0PU',
      text:'Southwark&rsquo;s civic seat for seventy-five years until the council moved out in 2009; sold in 2014 and converted into Goldsmiths student accommodation, keeping its original council chamber and heritage features inside a new build.\n\nCamberwell&rsquo;s grandest civic building is now full of undergraduates rather than councillors.' },

    { id:'st-barnabas-eltham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/St_Barnabas%2C_Rochester_Way_-_geograph.org.uk_-_2801704.jpg/330px-St_Barnabas%2C_Rochester_Way_-_geograph.org.uk_-_2801704.jpg', name:'St Barnabas Church', area:'Rochester Way, Eltham', pc:'SE9', cat:'grand', year:1859, era:'Built 1859, moved 1933',
      lat:51.4548, lon:0.0505, addr:'Rochester Way, SE9 6DP',
      text:'Built by George Gilbert Scott as the chapel for Woolwich&rsquo;s Royal Dockyard in 1859; when the dockyard closed and the chapel became redundant, the entire building was dismantled and moved to this Eltham site in 1933.\n\nA building can outlive the industry it was built to serve &mdash; this one simply relocated when its own congregation&rsquo;s jobs disappeared.' },

    { id:'parris-cues', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/London%2C_Forest_Hill_Library.jpg/330px-London%2C_Forest_Hill_Library.jpg', name:'Parris Cues', area:'Church Vale, Forest Hill', pc:'SE23', cat:'works', year:1984, era:'Workshop since 1984',
      lat:51.4373, lon:-0.0502, addr:'5 Church Vale, SE23 2UW',
      text:'John Parris started out modifying and repairing his own cue in 1970s Exeter, teaching himself the craft through trial and error, before opening this Forest Hill workshop in 1984 to hand-make cues for professional players.\n\nHis reputation was made in 1987, when Steve Davis&rsquo;s cue snapped at the ferrule mid-match at the Rothmans Grand Prix &mdash; Parris Cues has been trusted with the sport&rsquo;s top players ever since, still run from the same workshop with his wife Christine.' },

    { id:'one-tree-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Oak_of_Honor_at_One_Tree_Hill%2C_Honor_Oak_%2802%29.jpg/330px-Oak_of_Honor_at_One_Tree_Hill%2C_Honor_Oak_%2802%29.jpg', name:'One Tree Hill', area:'Honor Oak', pc:'SE23', cat:'memory', year:1897, era:'Enclosed 1896, retaken 1897',
      lat:51.4485, lon:-0.0435, addr:'One Tree Hill, Honor Oak Park, SE23',
      text:'A golf club enclosed this hilltop with a six-foot fence in 1896. On 10 October 1897 some 15,000 people tore it down, and the following Sunday 75,000 gathered again and fought running battles with 500 police.\n\nCamberwell council bought the hill outright for &pound;6,100 and opened it as a public park in 1905 &mdash; one of the largest mass trespasses in London history, and the reason the view from the top is still public today.' },

    { id:'st-augustine-honor-oak', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg/330px-Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg', name:'St Augustine&rsquo;s Church', area:'Honor Oak Park', pc:'SE23', cat:'grand', year:1874, era:'Consecrated 1874',
      lat:51.4435, lon:-0.0435, addr:'St Augustine&rsquo;s, Honor Oak Park, SE23 3LE',
      text:'The foundation stone was laid in 1872 and the church consecrated in 1874, once the parish had cleared its building debts &mdash; a fairly ordinary start for what is now a Grade II-listed Victorian church.\n\nIt anchors the residential streets built up around Honor Oak Park station in the same decades the golf club, a few hundred yards up the hill, was busy provoking a riot.' },

    { id:'metropolitan-tabernacle', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Metropolitan_Tabernacle%2C_Elephant_and_Castle%2C_London_-_geograph.org.uk_-_890858.jpg/330px-Metropolitan_Tabernacle%2C_Elephant_and_Castle%2C_London_-_geograph.org.uk_-_890858.jpg', name:'Metropolitan Tabernacle', area:'Elephant &amp; Castle', pc:'SE1', cat:'grand', year:1861, era:'Built 1861, survived fire and the Blitz',
      lat:51.4949, lon:-0.0993, addr:'Elephant &amp; Castle, SE1 6SD',
      text:'Charles Spurgeon&rsquo;s vast Baptist church, built in 1861 to seat six thousand, burned to the ground in 1898 &mdash; only the front portico survived &mdash; and was rebuilt behind the same columns.\n\nA German bomb gutted it again on the night of 9 May 1941. The portico survived a second time and now fronts a plainer 1957 rebuild &mdash; one facade, two disasters, still standing at the roundabout.' },

    { id:'elephant-castle-shopping-centre', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Castle_Square_elephant.jpg/330px-Castle_Square_elephant.jpg', name:'The Elephant &amp; Castle Shopping Centre', area:'Elephant &amp; Castle', pc:'SE1', cat:'grand', year:1965, era:'Opened 1965, demolished 2021',
      lat:51.4941, lon:-0.0995, addr:'Elephant &amp; Castle, SE1 6TE &mdash; site now redeveloped',
      text:'Opened in March 1965 on a bombed-out Victorian estate, it was the first covered shopping mall in Europe &mdash; 120 shops on three levels above a two-storey car park, painted pink in a failed 1990s attempt to cheer it up.\n\nIt closed for good in September 2020 and was demolished in 2021. This entry marks where it stood rather than somewhere you can still visit.' },

    { id:'bussey-building', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Rye_Lane_in_Peckham._-_geograph.org.uk_-_8189377.jpg/330px-Rye_Lane_in_Peckham._-_geograph.org.uk_-_8189377.jpg', name:'The Bussey Building', area:'Rye Lane, Peckham', pc:'SE15', cat:'culture', year:1887, era:'Built 1887, arts venue since the 2000s',
      lat:51.4703, lon:-0.068, addr:'133 Rye Lane, SE15 4ST',
      text:'George Gibson Bussey built this factory in 1887 to make cricket bats from his own Suffolk willow farm, having started out in 1864 making firearms and shooting tackle a few doors down Rye Lane.\n\nSlated for demolition, it was saved by the community group Peckham Vision and is now the CLF Art Caf&eacute; &mdash; music venue, rooftop cinema, and the anchor of Peckham&rsquo;s Copeland Park arts quarter.' },

    { id:'cobham-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Alan_Cobham_%28Bain_Collection%29.jpg/330px-Alan_Cobham_%28Bain_Collection%29.jpg', name:'Sir Alan Cobham', area:'Peckham', pc:'SE15', cat:'plaque', year:1894, era:'Blue plaque',
      lat:51.4723, lon:-0.0761, addr:'78 Denman Road, SE15 5NR',
      text:'Cobham was born on Denman Road and went on to become one of Britain&rsquo;s most celebrated aviation pioneers, flying long-distance survey routes to Australia and South Africa in the 1920s.\n\nHe later pioneered air-to-air refuelling, developing in the early 1930s a technique still used by military aircraft today.' },

    { id:'peckham-experiment-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dr._INNES_PEARSE_and_Dr._GEORGE_SCOTT_WILLIAMSON_-_142_Queen%27s_Road_Peckham_London_SE15_2HP.jpg/330px-Dr._INNES_PEARSE_and_Dr._GEORGE_SCOTT_WILLIAMSON_-_142_Queen%27s_Road_Peckham_London_SE15_2HP.jpg', name:'Dr Innes Pearse &amp; Dr George Scott Williamson', area:'Peckham', pc:'SE15', cat:'plaque', year:1926, era:'Blue plaque',
      lat:51.4732, lon:-0.0567, addr:'142 Queen&rsquo;s Road, SE15 2HP',
      text:'A blue plaque marks this address as where Pearse and Williamson opened their first Pioneer Health Centre in 1926, four years before the larger, purpose-built centre already in this gazetteer.\n\nThe two doctors who ran the study later married each other.' },

    { id:'blanch-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/229_of_%27Ye_Parish_of_Cam%CC%83erwell._A_brief_account_of_the_parish_of_Camberwell%2C_its_history_and_antiquities._%28With_plates_and_maps.%29%27_%2811109177033%29.jpg/330px-229_of_%27Ye_Parish_of_Cam%CC%83erwell._A_brief_account_of_the_parish_of_Camberwell%2C_its_history_and_antiquities._%28With_plates_and_maps.%29%27_%2811109177033%29.jpg', name:'William Harnett Blanch', area:'Peckham', pc:'SE15', cat:'plaque', year:1836, era:'Blue plaque',
      lat:51.4718, lon:-0.0763, addr:'55 Denman Road, SE15',
      text:'Blanch spent years researching and writing Ye Parish of Camerwell (1875), a 500-page history of Peckham, Nunhead, Dulwich and Camberwell that local historians still cite today.\n\nHe is also remembered, slightly improbably, as founder of the London Thirteen Club &mdash; a dining society formed specifically to test and defy superstitions about the number thirteen.' },

    { id:'griggs-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Aubrey_Beardsley_%28British%2C_1872-1898%29%2C_Printed_by_William_Griggs_%28British%2C_1832-1911%29%2C_inventor_of_photo-chromo-lithography_-_Isolde_-_2010.651_-_Cleveland_Museum_of_Art.jpg/330px-Aubrey_Beardsley_%28British%2C_1872-1898%29%2C_Printed_by_William_Griggs_%28British%2C_1832-1911%29%2C_inventor_of_photo-chromo-lithography_-_Isolde_-_2010.651_-_Cleveland_Museum_of_Art.jpg', name:'William Griggs', area:'Peckham', pc:'SE15', cat:'plaque', year:1832, era:'Blue plaque',
      lat:51.4713, lon:-0.0724, addr:'Elm House, 64 Elm Grove, SE15 5DE',
      text:'Griggs developed an early photo-chromo-lithography process, producing detailed colour illustrations for India Office publications throughout the Victorian period.\n\nHis process let colour images of Indian art, textiles and architecture circulate in Britain decades before colour photography itself became practical.' },

    { id:'sheppard-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Detail_from_the_statue_of_David_Sheppard%2C_the_cricketer_and_former_Anglican_Bishop_of_Liverpool_-_geograph.org.uk_-_974986.jpg/330px-Detail_from_the_statue_of_David_Sheppard%2C_the_cricketer_and_former_Anglican_Bishop_of_Liverpool_-_geograph.org.uk_-_974986.jpg', name:'Lord David Sheppard', area:'Peckham', pc:'SE15', cat:'plaque', year:1929, era:'Blue plaque',
      lat:51.4786, lon:-0.0596, addr:'Asylum House, 12 Asylum Road, SE15 2RL',
      text:'Sheppard played cricket for Sussex and England before ordination, then served as Bishop of Woolwich and later Bishop of Liverpool.\n\nHe remains the only ordained minister ever to have played Test cricket for England.' },

    { id:'friends-meeting-house-peckham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Former_Friends_Meeting_House_%288667814307%29.jpg/330px-Former_Friends_Meeting_House_%288667814307%29.jpg', name:'Friends Meeting House', area:'Peckham', pc:'SE15', cat:'plaque', year:1826, era:'Blue plaque',
      lat:51.4715, lon:-0.0714, addr:'2 Highshore Road, SE15 5AA',
      text:'Peckham&rsquo;s Quaker meeting house has counted the chocolate manufacturer and philanthropist Elizabeth Cadbury among its historic congregation.\n\nAstrophysicist Arthur Eddington, already in this gazetteer for his Blackheath plaque, was a lifelong Quaker who worshipped at meeting houses like this one throughout his life.' },

    { id:'hanover-chapel-peckham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/William_Bengo_Collyer.jpg/330px-William_Bengo_Collyer.jpg', name:'Hanover Chapel', area:'Peckham', pc:'SE15', cat:'plaque', year:1657, era:'Founded 1657, demolished early 20th century',
      lat:51.4732, lon:-0.0699, addr:'1&ndash;2 Central Buildings, Rye Lane, SE15 5DW',
      text:'A Congregational meeting house has stood on this corner of Rye Lane since 1657; it was rebuilt in 1817 under the popular minister William Bengo Collyer and renamed Hanover Chapel after its royal patrons.\n\nThe building itself was demolished in the early twentieth century to make way for tram tracks &mdash; the plaque here marks a site, not a survivor.' },

    { id:'frank-bates-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/B207_Southern_Syncopated_Orchestra_on_tour.jpg/330px-B207_Southern_Syncopated_Orchestra_on_tour.jpg', name:'Frank Bates', area:'Nunhead', pc:'SE15', cat:'plaque', year:1889, era:'Nubian Jak plaque, unveiled 2013',
      lat:51.4574, lon:-0.051, addr:'19 Hichisson Road, SE15 3AN',
      text:'Bates, a Barbadian singer, lodged here in 1918 and 1919 while lead vocalist with the Southern Syncopated Orchestra, the touring ensemble that helped introduce jazz to Britain.\n\nHe died in 1921, aged thirty-two, in the sinking of the SS Rowan off the Scottish coast &mdash; one of eight members of the orchestra lost in the same disaster.' },

    { id:'bridgetower-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/George_Bridgetower_by_Henry_Edridge%2C_1790.JPG/330px-George_Bridgetower_by_Henry_Edridge%2C_1790.JPG', name:'George Bridgetower', area:'Peckham', pc:'SE15', cat:'plaque', year:1778, era:'Nubian Jak plaque',
      lat:51.4665, lon:-0.0712, addr:'Jack Jones House, 12 Reedham Street, SE15 4PH',
      text:'Bridgetower, a virtuoso violinist of African and Polish descent, premiered Beethoven&rsquo;s Sonata No. 9 in Vienna in 1803 with the composer himself at the piano.\n\nBeethoven originally dedicated the piece to Bridgetower, but the two fell out over a woman at the after-party; the published score instead credits Rodolphe Kreutzer, who by most accounts never even played it.' },

    { id:'walter-rodney-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Peckham_library_exterior_1.jpg/330px-Peckham_library_exterior_1.jpg', name:'Dr Walter Rodney', area:'Peckham', pc:'SE15', cat:'memory', year:1942, era:'Memorial tree, planted',
      lat:51.4743, lon:-0.0693, addr:'Peckham Library Square, 122 Peckham Hill Street, SE15 5JR',
      text:'A memorial tree in Peckham Library Square honours Walter Rodney, the Guyanese historian and activist whose How Europe Underdeveloped Africa (1972) became a foundational text of Pan-Africanist scholarship.\n\nRodney was assassinated by a car bomb in Georgetown, Guyana, in 1980, an act widely attributed at the time to the government he had spent years openly organising against.' },

    { id:'bussey-alley-murals', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bussey_Building%2C_Peckham_-_geograph.org.uk_-_5086244.jpg/330px-Bussey_Building%2C_Peckham_-_geograph.org.uk_-_5086244.jpg', name:'Bussey Alley murals', area:'Copeland Park, Peckham', pc:'SE15', cat:'art', year:2020, era:'Painted and repainted since the 2010s',
      lat:51.47, lon:-0.0675, addr:'Copeland Park, off Copeland Road, SE15 4ST',
      text:'Thierry Noir &mdash; the first artist ever to legally paint the Berlin Wall &mdash; covered this alley in his trademark cartoon heads; INSA wrapped a gym next door in his signature rainbow pattern, and Japanese graffiti collective THA repainted the building&rsquo;s flank during the 2020 London Mural Festival.\n\nThe walls turn over every few years as new artists are invited in &mdash; what you see photographed here today may already be painted over by the time you visit.' },

    { id:'edward-turner-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Edward_Turner_Blue_Plaque_Unveiling1.jpg/330px-Edward_Turner_Blue_Plaque_Unveiling1.jpg', name:'Edward Turner', area:'Philip Walk, Peckham Rye', pc:'SE15', cat:'plaque', year:1901, era:'Blue plaque',
      lat:51.464, lon:-0.0665, addr:'8 Philip Walk, SE15 3NH',
      text:'A plaque marks the home of Edward Turner, the engineer who designed the Triumph Speed Twin and Bonneville motorcycles, the Ariel Square Four, and the V8 engine used in the Daimler SP250.\n\nOne engineer working from a Peckham Rye terrace ended up on both two wheels and four &mdash; his name still stamped on Triumph fuel tanks, his V8 quietly idling under Daimler bonnets.' },

    { id:'george-livesey-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/1/13/George_Livesey.jpg', name:'Sir George Livesey', area:'Old Kent Road', pc:'SE15', cat:'plaque', year:1834, era:'Blue plaque',
      lat:51.4795, lon:-0.0575, addr:'Livesey Museum, 682 Old Kent Road, SE15 1JF',
      text:'Livesey rose from office boy to chairman of the South Metropolitan Gas Company, and pioneered a profit-sharing scheme for gasworkers decades before it became standard practice anywhere else in British industry.\n\nThe library he funded for local workers later reopened as the Livesey Museum for Children, the only museum in London built specifically for under-twelves, before it closed in 2008.' },

    { id:'rio-ferdinand-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Web_Summit_2015_-_Dublin%2C_Ireland_-_22183056474_%28cropped%29.jpg/330px-Web_Summit_2015_-_Dublin%2C_Ireland_-_22183056474_%28cropped%29.jpg', name:'Rio Ferdinand', area:'Leyton Square, Peckham', pc:'SE15', cat:'plaque', year:1978, era:'Plaque unveiled 2003, voted by the people',
      lat:51.4745, lon:-0.0525, addr:'Leyton Square, Peckham Park Road, SE15 6TG',
      text:'A plaque on the Friary Estate marks the playground where Rio Ferdinand, born in Peckham in 1978, played as a boy before going on to captain Manchester United and England.\n\nIt was put up under Southwark&rsquo;s people&rsquo;s plaque scheme &mdash; voted for by local residents rather than awarded by a heritage body, on the estate he still calls home in interviews.' },

    { id:'crystal-palace-building', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Upper_Norwood_Town_Centre_-_1.jpg/330px-Upper_Norwood_Town_Centre_-_1.jpg', name:'The Crystal Palace', area:'Crystal Palace Park', pc:'SE19', cat:'grand', year:1854, era:'Rebuilt at Sydenham 1854, burned 1936',
      lat:51.4205, lon:-0.0715, addr:'Crystal Palace Park, SE19 2GA',
      text:'Joseph Paxton&rsquo;s Great Exhibition building was dismantled from Hyde Park and rebuilt here in 1854, three times its original size &mdash; 1,848 feet long, 108 feet high at the central transept, nearly a million square feet of glass and iron.\n\nIt burned to the ground in a single night on 30 November 1936; the glow was reportedly visible from eight counties. Nothing of the glasshouse itself survives &mdash; only the terraces and substructure below it.' },

    { id:'crystal-palace-subway', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Upper_Norwood_Town_Centre_-_1.jpg/330px-Upper_Norwood_Town_Centre_-_1.jpg', name:'Crystal Palace Subway', area:'Crystal Palace Parade', pc:'SE19', cat:'grand', year:1865, era:'Built 1865, restored 2024',
      lat:51.4188, lon:-0.0729, addr:'Crystal Palace Parade, SE19 2BA',
      text:'Charles Barry Jr&rsquo;s ornate brick-vaulted subway let first-class passengers walk directly from the High Level Station platforms to the Palace without touching the street. The station above was demolished in 1961; the subway, buried and largely forgotten, survived underneath.\n\nUsed as an air-raid shelter in the war and left to decay for decades after, it reopened in September 2024 after a &pound;3.5m restoration, just ahead of its 160th anniversary &mdash; a Grade II* structure with no building left to serve.' },

    { id:'borough-market', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/London_2018_March_IMG_0663.jpg/330px-London_2018_March_IMG_0663.jpg', name:'Borough Market', area:'Borough High Street', pc:'SE1', cat:'works', year:1756, era:'Chartered 1756, Victorian halls 1851',
      lat:51.5055, lon:-0.091, addr:'8 Southwark Street, SE1 1TL',
      text:'Trading here in some form since at least 1276, it was formally re-founded by local subscription in 1756 after Parliament closed the chaotic street market on London Bridge&rsquo;s approach. Henry Rose&rsquo;s Gothic ironwork halls, built in 1851, still stand under the railway viaduct.\n\nA slice of the old Royal Opera House&rsquo;s Floral Hall, dismantled and rebuilt here in 2004, now roofs part of the market &mdash; a fragment of Covent Garden hiding in Southwark.' },

    { id:'national-maritime-museum', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/EH1211481_National_Maritime_Museum_10_%28cropped%29.JPG/330px-EH1211481_National_Maritime_Museum_10_%28cropped%29.JPG', name:'National Maritime Museum', area:'Greenwich', pc:'SE10', cat:'culture', year:1937, era:'Opened 27 April 1937',
      lat:51.4816, lon:-0.0055, addr:'Romney Road, SE10 9NF',
      text:'Opened by George VI under the National Maritime Museum Act 1934, built largely on the collection Sir James Caird donated, and named on Rudyard Kipling&rsquo;s suggestion. It holds the world&rsquo;s largest collection on Britain&rsquo;s history at sea &mdash; over two million objects, ship models, charts and instruments going back to the seventeenth century.\n\nIt sits directly between the Queen&rsquo;s House and the Old Royal Naval College &mdash; the missing museum in a trio of buildings this gazetteer already covers individually.' },

    { id:'greenwich-foot-tunnel', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Inside_Greenwich_Foot_Tunnel.jpg/330px-Inside_Greenwich_Foot_Tunnel.jpg', name:'Greenwich Foot Tunnel', area:'Cutty Sark Gardens, Greenwich', pc:'SE10', cat:'maritime', year:1902, era:'Opened 4 August 1902',
      lat:51.4839, lon:-0.0097, addr:'Cutty Sark Gardens, SE10 9HT',
      text:'Dug by hand through the chalk and opened in 1902, it let south London dockers reach work on the Isle of Dogs without depending on the ferries. Its walls still carry 200,000 original glazed tiles.\n\nBombed at the northern end in the Blitz, it reopened within months behind an emergency steel-and-concrete lining that still narrows the tunnel at that point today.' },

    { id:'st-pauls-deptford', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Deptford_High_Street%2C_SE8_-_geograph.org.uk_-_1490848.jpg/330px-Deptford_High_Street%2C_SE8_-_geograph.org.uk_-_1490848.jpg', name:'St Paul\'s Church', area:'Deptford High Street', pc:'SE8', cat:'grand', year:1730, era:'Built 1712&ndash;1730',
      lat:51.478, lon:-0.0263, addr:'Deptford High Street, SE8 4RT',
      text:'Thomas Archer&rsquo;s Baroque parish church, one of the Commissioners&rsquo; &ldquo;Queen Anne&rdquo; churches funded after 1711, is closer to Roman Baroque than any other English church of its date &mdash; Archer drew directly on Borromini&rsquo;s Sant&rsquo;Agnese and Pietro da Cortona&rsquo;s Santa Maria della Pace.\n\nIts main body is raised bodily over a crypt, reached by dramatic curved flanking stairs &mdash; an unusually theatrical solution built to dignify the parish&rsquo;s own burial vaults.' },

    { id:'golden-hinde', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Golden_Hind_replica.jpg/330px-Golden_Hind_replica.jpg', name:'The Golden Hinde', area:'St Mary Overie Dock, Bankside', pc:'SE1', cat:'maritime', year:1973, era:'Built 1973, moored here since 1996',
      lat:51.5065, lon:-0.0908, addr:'St Mary Overie Dock, Cathedral Street, SE1 9DE',
      text:'A full-size, seaworthy replica of Francis Drake&rsquo;s galleon, launched in 1973 and sailed as a working museum ship before settling permanently into this dock beside Southwark Cathedral in 1996.\n\nUnlike most replicas, this one actually earned the comparison: she has circumnavigated the globe twice, logging over 140,000 miles under sail.' },

    { id:'danson-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/North_Face_of_Danson_House_%2801%29.jpg/330px-North_Face_of_Danson_House_%2801%29.jpg', name:'Danson House', area:'Danson Park, Bexleyheath', pc:'DA6', cat:'grand', year:1766, era:'Built 1762&ndash;1766',
      lat:51.455, lon:0.14, addr:'Danson Park, Bexleyheath, DA6 8HL',
      text:'Robert Taylor &mdash; later architect of the Bank of England &mdash; designed this Palladian villa for Sir John Boyd, a merchant whose fortune came from the West Indian sugar trade, its centrepiece an octagonal salon lined in gilded mirrors.\n\nEnglish Heritage named it London&rsquo;s most at-risk significant building in 1995; a decade of restoration followed, and the Queen herself reopened it in July 2005.' },

    { id:'avery-hill-winter-garden', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Avery_Hill_Park_hothouse_%2817767255915%29.jpg/330px-Avery_Hill_Park_hothouse_%2817767255915%29.jpg', name:'Avery Hill Winter Garden', area:'Eltham', pc:'SE9', cat:'green', year:1889, era:'Built 1889',
      lat:51.445, lon:0.07, addr:'Bexley Road, SE9 2PQ',
      text:'Colonel John North, who made his fortune in Chilean nitrates, commissioned this domed iron-and-glass winter garden in 1889 to house palms and exotics from across the empire, part of a mansion complex that cost some &pound;200,000 to build.\n\nIt is the second-largest Victorian glasshouse in Britain after Kew&rsquo;s Temperate House, and still holds one of the country&rsquo;s largest Canary date palms, planted when the glass went up around it.' },

    { id:'old-royal-naval-college-domes', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Royal_Naval_College_Greenwich_view_from_the_Thames.jpg/330px-Royal_Naval_College_Greenwich_view_from_the_Thames.jpg', name:'Old Royal Naval College', area:'King William Walk, Greenwich', pc:'SE10', cat:'grand', year:1712, era:'Designed from the 1690s, largely complete by 1712',
      lat:51.4826, lon:-0.0089, addr:'King William Walk, SE10 9NN',
      text:'Wren originally planned one central dome and two river-facing wings, until Queen Mary insisted the view of the Queen&rsquo;s House behind it stay open. His solution &mdash; two matching domed courts set either side of a clear central axis &mdash; became one of the most photographed river views in London.\n\nThe dome over King William Court tops the Painted Hall; its twin, over Queen Mary Court, tops the chapel &mdash; a deliberate architectural compromise this gazetteer&rsquo;s Painted Hall entry doesn&rsquo;t cover on its own.' },

    { id:'the-shard', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/The_Shard_at_sunset_2017_%28cropped%29.jpg/330px-The_Shard_at_sunset_2017_%28cropped%29.jpg', name:'The Shard', area:'London Bridge', pc:'SE1', cat:'grand', year:2012, era:'Topped out 2012',
      lat:51.5045, lon:-0.0865, addr:'32 London Bridge Street, SE1 9SG',
      text:'Renzo Piano&rsquo;s glass-clad pyramid rises 309.6 metres over seventy-two habitable floors, its irregular, tapering shards of glass deliberately left unfinished at the top to dissolve into the sky rather than end in a flat roof.\n\nIt topped out in March 2012 as the tallest building in western Europe, and remains so today &mdash; the UK&rsquo;s highest viewing gallery sits on the seventy-second floor, 245 metres up.' },

    { id:'guys-hospital', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Guy%27s_Hospital_-_geograph.org.uk_-_6551871.jpg/330px-Guy%27s_Hospital_-_geograph.org.uk_-_6551871.jpg', name:'Guy\'s Hospital', area:'Great Maze Pond, Southwark', pc:'SE1', cat:'grand', year:1721, era:'Founded 1721, opened 1726',
      lat:51.5031, lon:-0.0881, addr:'Great Maze Pond, SE1 9RT',
      text:'Thomas Guy, a bookseller who made a fortune printing Bibles and then a far larger one selling South Sea Company stock just before the bubble burst in 1720, endowed a hospital for patients turned away as &ldquo;incurable&rdquo; by the older St Thomas&rsquo; next door.\n\nGuy never married and had no heirs; his hospital opened in January 1726, a year after his death, funded almost entirely by the &pound;219,499 he left it &mdash; a fortune built on exactly the kind of speculative bubble it&rsquo;s risky to walk away from in time. He did.' },

    { id:'eyre-massey-shaw-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/d/d3/Masseyshaw.gif', name:'Sir Eyre Massey Shaw', area:'Southwark', pc:'SE1', cat:'plaque', year:1830, era:'Blue plaque',
      lat:51.5021, lon:-0.0979, addr:'Winchester House, 94 Southwark Bridge Road, SE1 0EG',
      text:'Shaw became the first Chief Officer of the Metropolitan Fire Brigade in 1861 and spent thirty years modernising London&rsquo;s firefighting from the ground up.\n\nHe was famous enough in his day to appear, thinly disguised, as &ldquo;Captain Shaw&rdquo; in a Gilbert and Sullivan lyric in Iolanthe &mdash; a comic-opera nod to a real fire chief that would be strange in any other era.' },

    { id:'george-myers-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/6/64/George_Myers_Builder_1860s.jpg', name:'George Myers', area:'Southwark', pc:'SE1', cat:'plaque', year:1803, era:'Blue plaque',
      lat:51.4978, lon:-0.109, addr:'131 St George\'s Road, SE1 6HY',
      text:'Myers was the master builder behind most of Augustus Pugin&rsquo;s great Gothic Revival commissions, including large parts of the Palace of Westminster.\n\nPugin trusted him enough to hand over designs as rough sketches, relying on Myers to work out the practical detail &mdash; a method that let Pugin design far more buildings than he could ever have detailed himself.' },

    { id:'greenwich-market', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/312SFEC_LONDON-20070917.JPG/330px-312SFEC_LONDON-20070917.JPG', name:'Greenwich Market', area:'Greenwich', pc:'SE10', cat:'works', year:1700, era:'Chartered 1700, opened 1737',
      lat:51.4816, lon:-0.0097, addr:'Greenwich Market, SE10 9HZ',
      text:'A Royal Charter of 1700 granted the Commissioners of Greenwich Hospital the right to hold a market here for a thousand years; the market itself opened for trade in 1737, originally selling meat, fish, fruit and vegetables to a naval town.\n\nIt is still owned today by Greenwich Hospital, the Royal Navy&rsquo;s oldest charity &mdash; the same institution the Painted Hall a few streets away was originally built to feed.' },

    { id:'royal-military-academy-woolwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/2017-Woolwich%2C_RMA_-_3.jpg/330px-2017-Woolwich%2C_RMA_-_3.jpg', name:'The Royal Military Academy', area:'Woolwich Common', pc:'SE18', cat:'grand', year:1741, era:'Founded 1741, this building 1796&ndash;1806',
      lat:51.479, lon:0.0605, addr:'Woolwich Common, SE18',
      text:'Founded in 1741 to train officers of the Royal Artillery and Royal Engineers, the Academy moved into James Wyatt&rsquo;s purpose-built mock-castellated building on Woolwich Common in 1806, training British Army officers here for over two centuries until it closed in 1939.\n\nEveryone still calls it &ldquo;The Shop&rdquo; &mdash; a nickname from its very first home, a converted workshop inside the Royal Arsenal &mdash; which is also where the everyday phrase &ldquo;talking shop&rdquo; is said to come from.' },

    { id:'princess-alice-disaster', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Princess_alice_collision_in_thames.jpg/330px-Princess_alice_collision_in_thames.jpg', name:'The Princess Alice disaster', area:'Tripcock Point, Woolwich', pc:'SE18', cat:'memory', year:1878, era:'3 September 1878',
      lat:51.497, lon:0.087, addr:'Tripcock Point, Woolwich Reach, SE18 &mdash; river, no street address',
      text:'The pleasure steamer Princess Alice, returning from a day trip to Kent with around 750 people aboard, was struck by the collier Bywell Castle off Tripcock Point and cut clean in two. She sank in under four minutes.\n\nAt least 650 died &mdash; Britain&rsquo;s worst-ever inland-water disaster, war included &mdash; yet no complete passenger list survived to give an exact toll, and many bodies were never recovered from the mud.' },

    { id:'palace-of-placentia', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_historical_account_of_the_Royal_Hospital_for_Seamen_at_Greenwich_%281789%29_%2814786307743%29.jpg/330px-An_historical_account_of_the_Royal_Hospital_for_Seamen_at_Greenwich_%281789%29_%2814786307743%29.jpg', name:'Palace of Placentia', area:'Old Royal Naval College grounds', pc:'SE10', cat:'memory', year:1491, era:'Tudor royal palace, demolished 1660',
      lat:51.4822, lon:-0.0083, addr:'Old Royal Naval College, King William Walk, SE10 9NN',
      text:'Henry VIII was born in this riverside palace in 1491, and both his daughters after him &mdash; Mary I in 1516, Elizabeth I in 1533 &mdash; making Greenwich, not London, the birthplace of three Tudor monarchs. Charles II demolished the old palace in 1660 for a rebuild that stalled for decades.\n\nNothing of it stands above ground; the Old Royal Naval College&rsquo;s Baroque courts were built on and around its footprint, so the birthplace of the Tudor dynasty now sits directly beneath a very different building already in this gazetteer.' },

    { id:'globe-fire-1613', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Wenceslaus-Hollar-The-second-Globe-playhouse-detail.png/330px-Wenceslaus-Hollar-The-second-Globe-playhouse-detail.png', name:'Burning of the Globe', area:'Park Street, Bankside', pc:'SE1', cat:'memory', year:1613, era:'29 June 1613',
      lat:51.5075, lon:-0.0965, addr:'Park Street, SE1 &mdash; original Globe site',
      text:'A stage cannon fired during a performance of Shakespeare&rsquo;s Henry VIII sent burning wadding into the thatched roof; the whole theatre burned to the ground within an hour.\n\nRemarkably, no one died &mdash; the only recorded casualty was a man whose breeches caught fire and were put out with a bottle of ale. The company rebuilt in thatch-free, tiled form by February 1614, three and a half centuries before Wanamaker&rsquo;s reconstruction a few hundred yards away.' },

    { id:'woolworths-v2', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/The_New_Cross_Inn%2C_New_Cross_%2801%29.jpg/330px-The_New_Cross_Inn%2C_New_Cross_%2801%29.jpg', name:'The New Cross Woolworths V-2', area:'New Cross Road', pc:'SE14', cat:'memory', year:1944, era:'25 November 1944, 12:25pm',
      lat:51.4757, lon:-0.035, addr:'New Cross Road, SE14',
      text:'A German V-2 rocket fell without warning on a packed Woolworths on New Cross Road, at the exact moment a queue had formed for a rare wartime delivery of saucepans. A hundred and sixty-eight people were killed, thirty-three of them children.\n\nIt remains one of the deadliest single V-weapon strikes of the war on Britain &mdash; a direct hit on ordinary Saturday shopping, not a military target. Twenty-four of the dead were never identified, and the rocket gave no siren warning at all, since it fell faster than sound.' },

    { id:'tallis-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Photograph_of_cartographic_publisher_John_Tallis%2C_ca.1858.png/330px-Photograph_of_cartographic_publisher_John_Tallis%2C_ca.1858.png', name:'John Tallis', area:'New Cross', pc:'SE14', cat:'plaque', year:1817, era:'Blue plaque, 1978',
      lat:51.4746, lon:-0.0436, addr:'233 New Cross Road, SE14 5UH',
      text:'Tallis published London Street Views between 1838 and 1840 &mdash; 88 illustrated pamphlets recording, shopfront by shopfront, what stood along the capital&rsquo;s major streets.\n\nThe plaque on his house gives his birth year as 1816; most biographical sources say 1817 &mdash; a small discrepancy nobody has ever bothered to correct.' },

    { id:'bermondsey-horror', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Marie_Manning_portrait.jpg/330px-Marie_Manning_portrait.jpg', name:'The Bermondsey Horror', area:'Horsemonger Lane Gaol site, Borough', pc:'SE1', cat:'memory', year:1849, era:'Public execution, 13 November 1849',
      lat:51.497, lon:-0.0965, addr:'Newington Gardens, Harper Road/Newington Causeway, SE1 6BX',
      text:'Frederick and Maria Manning murdered Maria&rsquo;s wealthy admirer Patrick O&rsquo;Connor at their Bermondsey house and buried him under the kitchen flagstones; they were the first husband and wife hanged together in England since 1700, on a scaffold here watched by a crowd of up to 50,000.\n\nCharles Dickens stood in that crowd and was so disgusted by its &ldquo;wickedness and levity&rdquo; that his letter to The Times helped end public executions in Britain within twenty years.' },

    { id:'peckham-riots-2011', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Carpetright_store_after_Tottenham_riots.jpg/330px-Carpetright_store_after_Tottenham_riots.jpg', name:'The 2011 Peckham riots', area:'Rye Lane, Peckham', pc:'SE15', cat:'memory', year:2011, era:'8 August 2011',
      lat:51.4715, lon:-0.0693, addr:'Rye Lane, SE15',
      text:'On the third night of the August 2011 England riots, shops along Rye Lane &mdash; including one under Peckham&rsquo;s Victorian clock tower &mdash; were looted and a building was set alight, part of the disorder that spread from Tottenham across London.\n\nThe Peckham Peace Wall, a few doors down and already in this gazetteer, exists directly because of this night &mdash; four theatre workers covered a smashed Poundland window with a board, and thousands of hopeful post-it notes followed.' },

    { id:'lewisham-v1-1944', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/A21%2C_Lewisham_-_geograph.org.uk_-_3932112.jpg/330px-A21%2C_Lewisham_-_geograph.org.uk_-_3932112.jpg', name:'The Lewisham Market V-1', area:'Lewisham High Street', pc:'SE13', cat:'memory', year:1944, era:'28 July 1944, 9:41am',
      lat:51.4615, lon:-0.0155, addr:'Lewisham High Street, by the Clock Tower, SE13',
      text:'A flying bomb exploded in front of Lewisham&rsquo;s clock tower &mdash; already in this gazetteer &mdash; in the middle of a Friday morning market. Around fifty-one people were killed and over three hundred injured; a hundred shops were wrecked and that stretch of high street was rebuilt from scratch after the war.\n\nIt struck the same spot the 1897 Jubilee clock tower still stands on today &mdash; the tower survived; the market crowd in front of it did not.' },

    { id:'great-harry-woolwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2016_Woolwich%2C_Beresford_Square_market.jpg/330px-2016_Woolwich%2C_Beresford_Square_market.jpg', name:'The Great Harry', area:'Wellington Street, Woolwich', pc:'SE18', cat:'pub', year:1512, era:'Named after Henry VIII\'s flagship',
      lat:51.49, lon:0.0645, addr:'Wellington Street, SE18 6PW',
      text:'Named for the Henry Grace &agrave; Dieu &mdash; the &ldquo;Great Harry&rdquo; &mdash; Henry VIII&rsquo;s flagship, built at the Woolwich dockyard he founded. Woolwich&rsquo;s entire naval history compressed into one pub sign.\n\nIt burned to the ground in the August 2011 riots. Locals turned the hoardings into a &ldquo;wall of peace&rdquo; while it was rebuilt, and it reopened in July 2012, days before Woolwich hosted Olympic shooting events.' },

    { id:'cutty-sark-tavern', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/The_Cutty_Sark_Tavern%2C_Greenwich_-_geograph.org.uk_-_1469975.jpg/330px-The_Cutty_Sark_Tavern%2C_Greenwich_-_geograph.org.uk_-_1469975.jpg', name:'Cutty Sark Tavern', area:'Ballast Quay, Greenwich', pc:'SE10', cat:'pub', year:1804, era:'Built early 1800s, renamed 1951',
      lat:51.487, lon:0.0005, addr:'Ballast Quay, SE10 9PD',
      text:'It started life as the Green Man, then became the Union Tavern from around 1810 &mdash; only taking its current name in 1951, the year the actual Cutty Sark arrived to be preserved a short walk downriver.\n\nTwo centuries old under three different names, all on the same stretch of river.' },

    { id:'coach-and-horses-greenwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Soho_coach_and_horses_1.jpg/330px-Soho_coach_and_horses_1.jpg', name:'Coach and Horses', area:'Greenwich Market', pc:'SE10', cat:'pub', year:1780, era:'Trading since 1780',
      lat:51.4816, lon:-0.0097, addr:'Greenwich Market, SE10 9HZ',
      text:'A Grade II-listed pub that has stood at the centre of Greenwich Market since 1780 &mdash; older than the naval buildings around it in their current form.\n\nIt sits a few doors from Cutty Sark, the Naval College and the Observatory, all already in this gazetteer &mdash; the one place on this list where you could reasonably visit five stops without walking further than the length of a cricket pitch.' },

    { id:'phoenix-camberwell', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Phoenix%2C_Denmark_Hill%2C_SE5_%282429314820%29.jpg/330px-Phoenix%2C_Denmark_Hill%2C_SE5_%282429314820%29.jpg', name:'The Phoenix', area:'Windsor Walk, Camberwell', pc:'SE5', cat:'pub', year:1866, era:'Built 1866 as a station ticket hall, pub since 1984',
      lat:51.468, lon:-0.0925, addr:'Windsor Walk, SE5 8BB',
      text:'Built in 1866 as the ticket hall for Denmark Hill station, the Grade II-listed building burned down in 1980 &mdash; and when it reopened as a pub in 1984, it was named the Phoenix for exactly that reason.\n\nThe bar is made from a single mahogany tree, and a station clock salvaged from Llandudno Junction still hangs over the room.' },

    { id:'crown-greyhound-dulwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/The_Crown_and_Greyhound_Dulwich_Village_-_geograph.org.uk_-_1270849.jpg/330px-The_Crown_and_Greyhound_Dulwich_Village_-_geograph.org.uk_-_1270849.jpg', name:'Crown &amp; Greyhound', area:'Dulwich Village', pc:'SE21', cat:'pub', year:1900, era:'Built c.1900, replacing two rival inns',
      lat:51.4455, lon:-0.0865, addr:'73 Dulwich Village, SE21 7BJ',
      text:'Named for two separate, older pubs &mdash; the Crown and the Greyhound &mdash; that stood facing each other until they were demolished and merged into this one building around 1900.\n\nThe Greyhound drew Dulwich&rsquo;s middle-class club crowd, the Crown its farm labourers; the merger is a small monument to Dulwich itself urbanising.' },

    { id:'angel-rotherhithe', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Angel%2C_Bermondsey_Wall_East_-_geograph.org.uk_-_3495710.jpg/330px-The_Angel%2C_Bermondsey_Wall_East_-_geograph.org.uk_-_3495710.jpg', name:'The Angel', area:'Bermondsey Wall East, Rotherhithe', pc:'SE16', cat:'pub', year:1450, era:'15th-century origin, current building 1850s',
      lat:51.5013, lon:-0.0525, addr:'101 Bermondsey Wall East, SE16 4NB',
      text:'Built by monks from Bermondsey Priory as a guesthouse called the Salutation; renamed the Angel after the Reformation, in honour of the local lord of the manor.\n\nIt stands right in front of the ruins of Edward III&rsquo;s riverside manor house &mdash; a seven-hundred-year-old site carrying a five-hundred-year-old pub name.' },

    { id:'the-capitol-forest-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/The_Capitol%2C_Forest_Hill_-_geograph.org.uk_-_437086.jpg/330px-The_Capitol%2C_Forest_Hill_-_geograph.org.uk_-_437086.jpg', name:'The Capitol', area:'London Road, Forest Hill', pc:'SE23', cat:'pub', year:1929, era:'Opened as a cinema 1929, pub 2001&ndash;2023',
      lat:51.4395, lon:-0.0525, addr:'11&ndash;21 London Road, SE23 3HF',
      text:'Opened in 1929 as a 1,700-seat Neo-Classical cinema with its own theatre organ, it became a bingo hall in 1978, sat empty from 1996, then reopened as a pub under its original name in 2001, keeping the auditorium&rsquo;s scale and much of its decorative plasterwork intact.\n\nIt closed for good on 15 October 2023. This entry marks a building worth knowing, not somewhere you can still get a pint &mdash; the Neo-Classical facade is still there to look at from the street.' },

    { id:'job-centre-deptford', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg/330px-Deptford_High_Street%2C_SE8_%282%29_-_geograph.org.uk_-_1498383.jpg', name:'The Job Centre', area:'Deptford High Street', pc:'SE8', cat:'pub', year:2014, era:'Opened 2014 in a real job centre, closed 2026',
      lat:51.4785, lon:-0.0261, addr:'120&ndash;122 Deptford High Street, SE8 4NP',
      text:'Opened by the pub group Antic in 2014 inside a genuine former DHSS job centre, keeping the name as a deliberately blunt joke that split Deptford between finding it funny and finding it tone-deaf.\n\nIt was rebranded as Jam Circus in 2023, then closed for good in January 2026 &mdash; a short life for a very short-lived idea of a joke.' },

    { id:'london-and-rye-catford', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/London_and_Rye%2C_Catford%2C_SE6_%282663879410%29.jpg/330px-London_and_Rye%2C_Catford%2C_SE6_%282663879410%29.jpg', name:'London &amp; Rye', area:'Catford town centre', pc:'SE6', cat:'pub', year:1890, era:'Late-Victorian building, pub 2000s&ndash;2024',
      lat:51.4453, lon:-0.021, addr:'Catford town centre, SE6',
      text:'Named after the old coaching road running south from Catford to Rye in Sussex, the late-Victorian building had been retail space of one kind or another before becoming, for the first time, a pub.\n\nIt closed in August 2024, and a redevelopment application for the site was filed in 2025 &mdash; check before you make a special trip.' },

    { id:'white-swan-charlton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/The_White_Swan%2C_Charlton_-_geograph.org.uk_-_1541798.jpg/330px-The_White_Swan%2C_Charlton_-_geograph.org.uk_-_1541798.jpg', name:'White Swan', area:'Charlton Village', pc:'SE7', cat:'pub', year:1840, era:'Charlton\'s village pub since the 1840s, currently closed',
      lat:51.4845, lon:0.0365, addr:'22 The Village, SE7 8UD',
      text:'Charlton&rsquo;s Victorian village pub, licensed since at least 1840 and the social centre for the streets around Charlton House ever since &mdash; until it closed.\n\nA community group launched a crowdfunder in December 2025 to buy and reopen it, following the same rescue playbook as Nunhead&rsquo;s Ivy House &mdash; a story still mid-way through, not yet resolved either way.' },

    { id:'st-antholins-spire', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/St_Antholin_Cruse.jpg/330px-St_Antholin_Cruse.jpg', name:'St Antholin\'s Spire', area:'Round Hill, Sydenham', pc:'SE23', cat:'grand', year:1682, era:'Built 1682, moved here 1829',
      lat:51.4325, lon:-0.053, addr:'Round Hill, SE23',
      text:'Christopher Wren&rsquo;s spire topped a City church on Budge Row until an 1829 storm damaged it; Robert Harrild, a printing pioneer and the church&rsquo;s own warden, bought the wrecked upper section for &pound;5 and re-erected it as a garden folly at his house here.\n\nHarrild&rsquo;s mansion became a social club, then was demolished for 1960s housing &mdash; but the council kept the spire standing among the new blocks, so a fragment of Wren&rsquo;s London now rises out of an ordinary South London estate.' },

    { id:'louise-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Janusz_Korczak_%28cropped%29.jpg/330px-Janusz_Korczak_%28cropped%29.jpg', name:'Louise House', area:'Dartmouth Road, Forest Hill', pc:'SE23', cat:'memory', year:1891, era:'Opened 1891, Korczak\'s visit 1911',
      lat:51.4385, lon:-0.0535, addr:'Dartmouth Road, SE23',
      text:'Built in 1891 as a Girls&rsquo; Industrial Home &mdash; part boarding school, part trade training for children with nowhere else to go &mdash; it was visited in 1911 by Janusz Korczak, a Polish-Jewish paediatrician touring London&rsquo;s children&rsquo;s institutions.\n\nKorczak went home to Warsaw and opened an orphanage run on what he&rsquo;d seen here, developing ideas about children&rsquo;s rights that fed directly into the UN&rsquo;s later Declaration of the Rights of the Child. He died at Treblinka in 1942, having refused offers to save himself alone and gone to the camp with his orphans instead.' },

    { id:'forest-hill-pools', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Forest_Hill_Pools_%287550093884%29.jpg/330px-Forest_Hill_Pools_%287550093884%29.jpg', name:'Forest Hill Pools', area:'Dartmouth Road, Forest Hill', pc:'SE23', cat:'works', year:1884, era:'Built 1884, opened 1885',
      lat:51.4383, lon:-0.054, addr:'Dartmouth Road, SE23',
      text:'Thomas Aldwinckle&rsquo;s Victorian baths opened with two separate pools &mdash; one for working people, one for the &ldquo;upper classes&rdquo; &mdash; a segregation built into the architecture as standard practice for the time.\n\nAt the 1884 foundation-stone ceremony, 1,700 local schoolchildren marched down Dartmouth Road to a tent on the site, where each was given a bun and an orange for turning up.' },

    { id:'forest-hill-library', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/London%2C_Forest_Hill_Library.jpg/330px-London%2C_Forest_Hill_Library.jpg', name:'Forest Hill Library', area:'Dartmouth Road, Forest Hill', pc:'SE23', cat:'grand', year:1901, era:'Built 1900&ndash;1901',
      lat:51.4388, lon:-0.0538, addr:'Dartmouth Road, SE23',
      text:'Alexander Robert Hennell&rsquo;s Arts and Crafts library was one of over six hundred built across Britain and Ireland with money from the Scottish-American steel magnate Andrew Carnegie, who funded free public libraries on the condition that the local council agreed to run and stock them.\n\nA deep terracotta frieze of kneeling cherubs and floral swags runs the full width of the front &mdash; an ornamental flourish that&rsquo;s survived over a century of being walked past by people just there to return a book.' },

    { id:'havelock-walk', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Havelock_Walk%2C_Forest_Hill.jpg/330px-Havelock_Walk%2C_Forest_Hill.jpg', name:'Havelock Walk', area:'Forest Hill', pc:'SE23', cat:'art', year:1988, era:'Artists\' studios since the late 1980s',
      lat:51.437, lon:-0.0505, addr:'Havelock Walk, SE23',
      text:'A cobbled mews first laid out as a field path in the 1850s, badly bombed in the Second World War, and left mostly as derelict industrial storage until the artist Jeff Lowe started buying up the cheap warehouse space in the late 1980s and converting it into live-work studios.\n\nSixteen working studios now line the mews, among them the illustrator Rob Lowe &mdash; who works under the name Supermundane, all bold colour and repeating pattern &mdash; and Ian Wright, whose scratchy black-and-white portraits ran weekly in the NME and monthly in The Face through the 1980s. The Canvas &amp; Cream gallery anchors the far end, and the whole street throws its doors open for a public Open Studios weekend at least twice a year, spring and winter, with live music, printmaking demonstrations, a small artisan market and a kids&rsquo; craft table set up between the workshops.' },

    { id:'one-tree-hill-gun', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg/330px-Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg', name:'The One Tree Hill gun emplacement', area:'Honor Oak', pc:'SE23', cat:'memory', year:1916, era:'Built 1916',
      lat:51.4482, lon:-0.043, addr:'One Tree Hill, Honor Oak Park, SE23',
      text:'An octagonal concrete platform, built in 1916 to mount a Royal Naval anti-aircraft gun against Zeppelin and Gotha bomber raids, still sits on the hill&rsquo;s summit &mdash; two watches of ten naval ratings were stationed here to crew it.\n\nBy most accounts it never brought down a single German aircraft in the whole war, though it did reportedly manage to damage some tram equipment down in Peckham Rye. The mounting-ring bolts and a groove for the lightning conductor are still visible in the concrete.' },

    { id:'oxleas-wood', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Trees_in_Jack_Wood%2C_Shooter%27s_Hill.jpg/330px-Trees_in_Jack_Wood%2C_Shooter%27s_Hill.jpg', name:'Oxleas Wood', area:'Eltham / Shooter\'s Hill', pc:'SE18', cat:'green', year:1993, era:'Ancient woodland, saved from a road scheme in 1993',
      lat:51.467, lon:0.066, addr:'Oxleas Wood, SE18 3JA',
      text:'Parts of this wood have stood continuously since the end of the last Ice Age, more than eight thousand years ago &mdash; a royal manor from 1311 until 1679, and public parkland since 1934.\n\nIn 1993 a grassroots campaign called PARC (People Against the River Crossing) beat back a government motorway scheme that would have driven straight through it &mdash; over 3,000 people pledged civil disobedience to stop the bulldozers, and the road was withdrawn.' },

    { id:'sydenham-hill-wood', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Sydenham_Avenue_SE26.JPG/330px-Sydenham_Avenue_SE26.JPG', name:'Sydenham Hill Wood', area:'Sydenham Hill', pc:'SE26', cat:'green', year:1982, era:'Great North Wood remnant, reserve since 1982',
      lat:51.4361, lon:-0.0669, addr:'Sydenham Hill Wood, SE26 6LS',
      text:'The largest surviving fragment of the old Great North Wood, once reserved by Elizabeth I for naval shipbuilding timber. A disused Victorian railway line, closed in 1954, still cuts through it, crossed by a footbridge on Cox&rsquo;s Walk beside an 1870s Pulham rockery folly.\n\nIt&rsquo;s owned by the Dulwich Estate but run as a nature reserve by the London Wildlife Trust since 1982 &mdash; home to five species of bat and two rare hairstreak butterflies.' },

    { id:'green-chain-crystal-palace-nunhead', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Footpaths_across_Cator_Park%2C_Beckenham._-_geograph.org.uk_-_59155.jpg/330px-Footpaths_across_Cator_Park%2C_Beckenham._-_geograph.org.uk_-_59155.jpg', name:'The Green Chain Walk', area:'Crystal Palace to Nunhead', pc:'SE15', cat:'green', year:1977, era:'One stage of an 82km network begun 1977',
      lat:51.4581, lon:-0.0552, addr:'Ends at Nunhead Cemetery, SE15 3LP',
      text:'Four boroughs created the Green Chain Walk in 1977 to link some 300 open spaces between the Thames and Crystal Palace Park into one protected 82-kilometre network, in eleven official waymarked sections. Its final stage runs from Crystal Palace Park to Nunhead Cemetery, tying together two green spaces already in this gazetteer.\n\nThe whole network runs south from three separate Thames starting points &mdash; the Thames Barrier, Thamesmead and Erith &mdash; and doesn&rsquo;t fully converge until Oxleas Wood.' },

    { id:'capital-ring-woolwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Capital_Ring_waymarker_post.jpg/330px-Capital_Ring_waymarker_post.jpg', name:'The Capital Ring', area:'Woolwich to Falconwood', pc:'SE18', cat:'green', year:2005, era:'First stage of London\'s orbital walking route',
      lat:51.4913, lon:0.0688, addr:'Starts at the Woolwich Foot Tunnel, SE18 6DX',
      text:'The Capital Ring, London&rsquo;s 126-kilometre orbital walking route, officially begins at the Woolwich foot tunnel &mdash; already in this gazetteer &mdash; and its first stretch to Falconwood runs through Charlton and past Eltham, overlapping with the Green Chain network for its whole South East London run.\n\nIts opening section starts at the same 1902 tunnel entrance dockers once used to get to work &mdash; a Victorian engineering project now doubling as the start line for a twenty-first-century walking route.' },

    { id:'waterlink-way', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Footpaths_across_Cator_Park%2C_Beckenham._-_geograph.org.uk_-_59155.jpg/330px-Footpaths_across_Cator_Park%2C_Beckenham._-_geograph.org.uk_-_59155.jpg', name:'The Waterlink Way', area:'Ladywell to Greenwich', pc:'SE13', cat:'green', year:1995, era:'Riverside route, part of the National Cycle Network since the 1990s',
      lat:51.4535, lon:-0.0175, addr:'Ladywell Fields, SE13 7TY',
      text:'An eight-mile walking and cycling route that follows the Rivers Pool and Ravensbourne from South Norwood down through Ladywell Fields and Brookmill Park to the Cutty Sark in Greenwich, doubling as National Cycle Network Route 21.\n\nIt physically connects to both the Capital Ring and the Green Chain Walk at Cator Park in Beckenham &mdash; three separate walking routes stitched into one network across the borough.' },

    { id:'henry-williamson-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Brockley_station_eastern_entrance_2012.JPG/330px-Brockley_station_eastern_entrance_2012.JPG', name:'Henry Williamson', area:'Brockley', pc:'SE4', cat:'plaque', year:1902, era:'Maroon plaque, lived here 1902&ndash;1920',
      lat:51.464, lon:-0.031, addr:'21 Eastern Road, SE4',
      text:'Williamson spent his childhood and youth at this address &mdash; the setting for the early volumes of his autobiographical novel sequence A Chronicle of Ancient Sunlight. He won the 1928 Hawthornden Prize for Tarka the Otter.\n\nThe Henry Williamson Society placed the plaque here in 1984, working with Lewisham council.' },

    { id:'richard-jefferies-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/0/0b/Richard_jefferies.jpg', name:'Richard Jefferies', area:'Sydenham', pc:'SE26', cat:'plaque', year:1987, era:'Maroon plaque, unveiled 2 May 1987',
      lat:51.426, lon:-0.054, addr:'Sydenham, SE26',
      text:'The nature writer and novelist lived here between the ages of four and nine with his aunt and uncle, the Harrilds &mdash; relations of the printing pioneer Robert Harrild, whose relocated church spire already sits nearby in this gazetteer&rsquo;s Forest Hill entries.\n\nA separate English Heritage blue plaque for Jefferies exists at Footscray Road in Eltham &mdash; a different address entirely, so don&rsquo;t confuse the two if you go looking.' },

    { id:'david-jones-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/David_jones.jpg/330px-David_jones.jpg', name:'David Jones', area:'Brockley', pc:'SE4', cat:'plaque', year:1895, era:'Maroon plaque, unveiled 2 December 2015',
      lat:51.4635, lon:-0.0295, addr:'67 Arabin Road, SE4',
      text:'Born here in 1895, Jones served longer at the front than almost any other Great War poet, was wounded at Mametz Wood, and later wrote In Parenthesis (1937) &mdash; a war memoir T. S. Eliot called "a work of genius."\n\nHe grew up on Howson Road, the son of a printer, and some of his paintings and illustrations depict his family\'s Brockley house and garden directly.\n\nHe is buried in Brockley &amp; Ladywell Cemeteries, already in this gazetteer; the Friends of that cemetery led the campaign and crowdfunding for his plaque.' },

    { id:'edgar-wallace-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Bundesarchiv_Bild_102-13109%2C_Edgar_Wallace.jpg/330px-Bundesarchiv_Bild_102-13109%2C_Edgar_Wallace.jpg', name:'Edgar Wallace', area:'Lewisham', pc:'SE4', cat:'plaque', year:1875, era:'Blue plaque',
      lat:51.4638, lon:-0.0267, addr:'6 Tressillian Crescent, SE4 1QJ',
      text:'Wallace, illegitimate and largely self-educated, became one of the most prolific thriller writers of his era, producing well over a hundred novels.\n\nShortly before he died in 1932 he wrote the original story treatment for King Kong &mdash; work that still earns him a co-writing credit on the film today.' },

    { id:'dietrich-bonhoeffer-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Bundesarchiv_Bild_146-1987-074-16%2C_Dietrich_Bonhoeffer.jpg/330px-Bundesarchiv_Bild_146-1987-074-16%2C_Dietrich_Bonhoeffer.jpg', name:'Dietrich Bonhoeffer', area:'Sydenham', pc:'SE26', cat:'plaque', year:1933, era:'Pastor here 1933&ndash;1935',
      lat:51.428, lon:-0.0555, addr:'German Lutheran Church, Dacres Road, SE26',
      text:'The German theologian and later anti-Nazi resistance figure served as pastor of this German-speaking congregation for two years before returning to Germany. He was executed by the Nazis in 1945, weeks before the war ended.\n\nThe church itself was destroyed by bombing in 1944 &mdash; Bonhoeffer&rsquo;s own building didn&rsquo;t outlive him by more than a year.' },

    { id:'jim-connell-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg/330px-Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg', name:'Jim Connell', area:'Honor Oak', pc:'SE23', cat:'plaque', year:1889, era:'Wrote "The Red Flag" here, December 1889',
      lat:51.447, lon:-0.0455, addr:'22a Stondon Park, SE23',
      text:'Connell wrote the lyrics to &ldquo;The Red Flag&rdquo; &mdash; still the Labour Party&rsquo;s anthem today &mdash; on a train home from Charing Cross, then finished the song at this address.\n\nSome sources describe his plaque as &ldquo;red&rdquo; rather than maroon; almost certainly just loose colour terminology for the same dark-red Lewisham scheme, not a separate one.' },

    { id:'henry-cooper-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Henry_Cooper_1969.jpg/330px-Henry_Cooper_1969.jpg', name:'Sir Henry Cooper', area:'Bellingham', pc:'SE6', cat:'plaque', year:1934, era:'Grew up here, blue-collar Lewisham boxer',
      lat:51.434, lon:-0.0225, addr:'120 Farmstead Road, SE6',
      text:'Britain&rsquo;s best-loved heavyweight boxer, who twice fought Muhammad Ali and famously floored him in 1963, grew up in a council house on the Bellingham Estate.\n\nThe plaque marks the actual family home he grew up in &mdash; not a gym, not a stadium, just the house.' },

    { id:'roy-porter-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Roy_Porter_house_13_Camplin_Street_New_Cross_Gate_London_SE14_5QX.jpg/330px-Roy_Porter_house_13_Camplin_Street_New_Cross_Gate_London_SE14_5QX.jpg', name:'Roy Porter', area:'New Cross Gate', pc:'SE14', cat:'plaque', year:2008, era:'Plaque unveiled 5 June 2008',
      lat:51.47, lon:-0.04, addr:'13 Camplin Street, SE14',
      text:'The medical historian, who grew up in South London before becoming one of Britain&rsquo;s most prolific historians of the Enlightenment and of medicine, is commemorated at this address by a plaque unveiled by the Mayor of Lewisham.\n\nThe record is clear that he&rsquo;s commemorated here rather than definitively confirmed to have lived here &mdash; a small distinction, honestly kept.' },

    { id:'leslie-paul-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg/330px-Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg', name:'Leslie Paul', area:'Honor Oak', pc:'SE23', cat:'plaque', year:1925, era:'Woodcraft Folk founded 1925',
      lat:51.447, lon:-0.0455, addr:'Honor Oak, SE23',
      text:'Paul grew up in Honor Oak and co-founded the Woodcraft Folk here in 1925 &mdash; a still-active youth movement built around outdoor education and folk tradition &mdash; serving as its head until 1934.\n\nNo precise street survives in the record for this one, so the marker sits on the general Honor Oak locator rather than a guessed address.' },

    { id:'walters-way', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg/330px-Honor_Oak_Parks_shops_-_geograph.org.uk_-_731971.jpg', name:'Walter\'s Way', area:'Honor Oak', pc:'SE23', cat:'grand', year:1985, era:'Self-built 1978&ndash;1985',
      lat:51.4478, lon:-0.0398, addr:'Walter\'s Way, Honor Oak Park, SE23 3LH',
      text:'Thirteen timber-frame houses on a hillside plot too awkward for conventional builders, put up by the families who would live in them using architect Walter Segal&rsquo;s post-and-beam method &mdash; no bricklaying or plastering skills required, just Segal on hand to advise.\n\nSegal&rsquo;s frames rest on paving-slab pad foundations rather than dug trenches, so the mature trees already on site never had to come down &mdash; several houses still grow up around them. Segal Close, the scheme&rsquo;s second phase, sits just round the corner.' },

    { id:'wg-grace-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/WG_Grace_c1902.jpg/330px-WG_Grace_c1902.jpg', name:'W.G. Grace', area:'Mottingham', pc:'SE9', cat:'plaque', year:1899, era:'Blue plaque, lived here from 1899',
      lat:51.427, lon:0.043, addr:'Fairmount, Mottingham Lane, SE9',
      text:'Grace moved his family here in 1899 to manage and captain the newly formed London County Cricket Club, based a short walk away at Crystal Palace Park &mdash; already in this gazetteer &mdash; and kept playing club cricket into his sixties.\n\nThe Mottingham years were shadowed by loss: his daughter Bessie died of typhoid here in 1899, aged twenty, and his eldest son died of appendicitis in 1905. He lived at Fairmount until his own death in 1915.' },

    { id:'anne-shelton-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/0/08/St_Mary%27s_Church%2C_Shelton%2C_Norfolk_-_Window_-_geograph.org.uk_-_1029382.jpg', name:'Anne Shelton', area:'Court Lane, Dulwich', pc:'SE21', cat:'plaque', year:1923, era:'Blue plaque, awarded 2007',
      lat:51.442, lon:-0.085, addr:'142 Court Lane, SE21',
      text:'Shelton was born in Dulwich in 1923 and made her radio debut aged sixteen on the BBC&rsquo;s Monday Night at Eight, going on to sing for British troops on forces radio and at military bases throughout the Second World War.\n\nShe topped the UK singles chart as late as 1956, with &ldquo;Lay Down Your Arms&rdquo; &mdash; a wartime voice that kept having hits well into the rock and roll era. Southwark council awarded her Court Lane plaque in 2007, thirteen years after her death.' },

    { id:'marianne-jean-baptiste-plaque', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Marianne_Jean-Baptiste_and_Mike_Leigh_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg/330px-Marianne_Jean-Baptiste_and_Mike_Leigh_at_the_2024_Toronto_International_Film_Festival_%28cropped%29.jpg', name:'Marianne Jean-Baptiste', area:'Camberwell', pc:'SE5', cat:'plaque', year:1967, era:'Born here 1967',
      lat:51.4735, lon:-0.0895, addr:'Camberwell, SE5 &mdash; exact address unconfirmed',
      text:'Born in Camberwell in 1967 to parents from Antigua and St Lucia and raised in Peckham, Jean-Baptiste became the first Black British actress ever nominated for an Academy Award, for Mike Leigh&rsquo;s Secrets &amp; Lies in 1996.\n\nNearly three decades later she reunited with Leigh for Hard Truths (2024) and swept the year&rsquo;s critics&rsquo; awards &mdash; New York, LA and the National Society of Film Critics all named her Best Actress, a first for a Black actress. A commemorative plaque exists for her, but no confirmed public street address has surfaced yet &mdash; treat this as marking the neighbourhood, not a specific doorway.' },

    { id:'mitre-pub-greenwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/The_Mitre_Hotel%2C_Greenwich_High_Road.jpg/330px-The_Mitre_Hotel%2C_Greenwich_High_Road.jpg', name:'The Mitre', area:'Greenwich High Road', pc:'SE10', cat:'pub', year:1830, era:'Coffee house 1700s, rebuilt 1830&ndash;31',
      lat:51.4785, lon:-0.0135, addr:'291 Greenwich High Road, SE10',
      text:'Started life as an eighteenth-century coffee shop before burning down in 1829 and being rebuilt as a pub in 1830&ndash;31, then further damaged during the Second World War.\n\nA plaque on the building sets out this whole sequence of fire, rebuild and bomb damage in one short read &mdash; a pub that has effectively been rebuilt twice and is still pouring.' },

    { id:'dulwich-library-blitz-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Dulwichlibraryfront.jpg/330px-Dulwichlibraryfront.jpg', name:'1940 Blitz memorial', area:'Dulwich Library', pc:'SE22', cat:'memory', year:1940, era:'24 September 1940, plaque placed 2013',
      lat:51.452, lon:-0.073, addr:'Dulwich Library, Eynella Road, SE22',
      text:'A plaque outside Dulwich Library names three civilians &mdash; Walter Stacey, Ruth Stacey and Rosie Crawford &mdash; killed nearby in a German air raid on 24 September 1940.\n\nThe Dulwich Society placed it in 2013, seventy-three years after the raid &mdash; three ordinary names kept legible on a library wall that any of the thousands of daily borrowers might otherwise never learn.' },

    { id:'herne-tavern', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Herne_Tavern%2C_Honor_Oak%2C_SE22.jpg/330px-Herne_Tavern%2C_Honor_Oak%2C_SE22.jpg', name:'Herne Tavern', area:'East Dulwich', pc:'SE22', cat:'pub', year:1850, era:'Built mid-19th century, interwar interior preserved',
      lat:51.4478, lon:-0.0654, addr:'2 Forest Hill Road, SE22 0RR',
      text:'A mid-Victorian pub whose interwar-era redesign has survived almost untouched since, earning it a place on CAMRA&rsquo;s National Inventory of Historic Pub Interiors.\n\nIt&rsquo;s one of a fairly short national list recognised for a genuinely unaltered historic interior, rather than just an old facade wrapped around a modern refit.' },

    { id:'white-hart-southwark', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/White_Hart_Badge_of_Richard_II.svg/330px-White_Hart_Badge_of_Richard_II.svg.png', name:'The White Hart', area:'Borough High Street', pc:'SE1', cat:'memory', year:1406, era:'First recorded 1406, demolished 1889',
      lat:51.503, lon:-0.0905, addr:'White Hart Yard, off Borough High Street, SE1',
      text:'A medieval coaching inn, likely older than its first written record, that served as the headquarters of Jack Cade&rsquo;s Rebellion in 1450 &mdash; an episode Shakespeare later dramatised in Henry VI, Part 2. Dickens also sent Mr Pickwick here to hire Sam Weller.\n\nThe original building was demolished in 1889. A separate Victorian pub of the same name had already opened nearby on Great Suffolk Street in 1882 and still carries the name today &mdash; two different buildings sharing one long story, much like this gazetteer&rsquo;s Tabard Inn entry.' },

    { id:'lord-nelson-old-kent-road', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/HoratioNelson1.jpg/330px-HoratioNelson1.jpg', name:'The Lord Nelson', area:'Old Kent Road, Bermondsey', pc:'SE1', cat:'pub', year:1800, era:'Built early 19th century, listed 1972',
      lat:51.4832, lon:-0.0625, addr:'386 Old Kent Road, SE1 5AG',
      text:'A Grade II-listed early-nineteenth-century pub on the CAMRA National Inventory of Historic Pub Interiors. The Old Kent Road once carried around thirty-nine pubs along its length.\n\nOnly two of those thirty-nine survive today &mdash; this is one of them, a lone marker of how completely that trade has vanished from one of London&rsquo;s oldest roads.' },

    { id:'half-moon-herne-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Third_Church_of_Christ_Scientist%2C_viewed_along_Half_Moon_Street.jpg/330px-Third_Church_of_Christ_Scientist%2C_viewed_along_Half_Moon_Street.jpg', name:'The Half Moon', area:'Herne Hill', pc:'SE24', cat:'pub', year:1896, era:'Rebuilt 1894&ndash;96, Grade II* listed',
      lat:51.4526, lon:-0.1006, addr:'10 Half Moon Lane, SE24 9HU',
      text:'An inn has stood on this site since the mid-seventeenth century; the current Jacobethan Revival building dates from 1894&ndash;96. It ran as a live-music venue for nearly fifty years &mdash; U2 played three gigs here in 1980, where Island Records&rsquo; Chris Blackwell first saw them, and Dylan Thomas was a regular.\n\nFlooded and closed in August 2013, it reopened under Fuller&rsquo;s in 2017; the old venue stage is gone, but it still hosts an annual Dylan Day. It sits just outside this gazetteer&rsquo;s usual postcode range, on the Herne Hill/Dulwich border &mdash; included as a deliberate, small stretch.' },

    { id:'dog-and-duck-st-georges', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Dog_and_Duck%2C_Soho%2C_W1_%282534053077%29.jpg/330px-Dog_and_Duck%2C_Soho%2C_W1_%282534053077%29.jpg', name:'Site of the Dog and Duck', area:'St George\'s Fields', pc:'SE1', cat:'memory', year:1642, era:'Tavern 1642, spa by 1695, closed 1799',
      lat:51.4956, lon:-0.1031, addr:'Now under the Imperial War Museum, Geraldine Mary Harmsworth Park, SE1 6HZ',
      text:'Named for duck-baiting sport once staged on its ponds, it ran through three lives &mdash; popular tavern, then a fashionable mineral-water spa by 1695, then a rowdy concert venue notorious for highwaymen by the 1770s.\n\nSurrey magistrates refused to renew its licence in 1787 after a royal proclamation against drunkenness, and it closed for good in 1799. Its 1716 inn sign, showing a dog gripping a duck, survives in the Cuming Museum collection &mdash; the pub itself outlived by its own signboard.' },

    { id:'trafalgar-tavern', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/The_Trafalgar_Tavern_%284703195270%29.jpg/330px-The_Trafalgar_Tavern_%284703195270%29.jpg', name:'Trafalgar Tavern', area:'Greenwich', pc:'SE10', cat:'pub', year:1837, era:'Built 1837, listed 1973',
      lat:51.485, lon:-0.0068, addr:'Park Row, SE10 9NW',
      text:'Joseph Kay designed it after reportedly outmanoeuvring the previous tavern owner&rsquo;s expansion plans and taking the riverside site for himself. Dickens set a wedding breakfast here in Our Mutual Friend, and it hosted the Liberal Party&rsquo;s whitebait dinners through Victorian times, the last one in 1885 with Gladstone&rsquo;s outgoing Cabinet.\n\nIt closed in 1915 and spent decades as housing for aged seamen and then a working men&rsquo;s club, not reopening as a pub again until 1965.' },

    { id:'hare-and-billet', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/The_Hare_and_Billet_Public_House%2C_Blackheath_Vale_-_geograph.org.uk_-_1600346.jpg/330px-The_Hare_and_Billet_Public_House%2C_Blackheath_Vale_-_geograph.org.uk_-_1600346.jpg', name:'Hare and Billet', area:'Blackheath', pc:'SE3', cat:'pub', year:1600, era:'Trading since the 1600s',
      lat:51.468, lon:0.0037, addr:'Hare &amp; Billet Road, SE3 0QJ',
      text:'A coaching inn on the Watling Street route to Dover, through the era when Blackheath was notorious for highwaymen; a 1780 Thomas Luny painting shows the building much as it still stands, overlooking Greenwich Park.\n\nStill trading today &mdash; one of the more straightforward pubs in this gazetteer to simply walk into.' },

    { id:'spanish-galleon', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/The_Spanish_Galleon_Tavern_-_geograph.org.uk_-_1292987.jpg/330px-The_Spanish_Galleon_Tavern_-_geograph.org.uk_-_1292987.jpg', name:'Spanish Galleon', area:'Greenwich', pc:'SE10', cat:'pub', year:1836, era:'Built 1836, listed',
      lat:51.4816, lon:-0.0093, addr:'1 College Approach, SE10 9HW',
      text:'Built as part of Joseph Kay&rsquo;s 1830s redevelopment of central Greenwich, on a site with a Galleon inn recorded two hundred years earlier; named for paintings of British naval victories over Spain once hung nearby in Greenwich Hospital.\n\nA full sailor&rsquo;s uniform turned up in the cellar during 1985 renovations and now hangs behind the bar.' },

    { id:'sun-in-the-sands', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Sun_in_the_Sands_inn_-_geograph.org.uk_-_634795.jpg/330px-Sun_in_the_Sands_inn_-_geograph.org.uk_-_634795.jpg', name:'Sun in the Sands', area:'Blackheath / Shooter\'s Hill border', pc:'SE3', cat:'pub', year:1745, era:'Inn since c.1745',
      lat:51.475, lon:0.025, addr:'Sun in the Sands, SE3 8SR',
      text:'An isolated highwayman&rsquo;s inn on the old drovers&rsquo; road, its name taken from the setting sun catching the dust kicked up by sheep being driven to London markets; local tradition has Henry VIII stopping here with Catherine of Aragon.\n\nIt gave its name to the major road junction that replaced it &mdash; the Sun in the Sands roundabout, where the A2 meets the Blackwall Tunnel approach, is now better known than the pub that named it.' },

    { id:'pilot-inn-greenwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Pilot_Inn%2C_Greenwich.jpg/330px-Pilot_Inn%2C_Greenwich.jpg', name:'Pilot Inn', area:'Greenwich Peninsula', pc:'SE10', cat:'pub', year:1801, era:'Built 1801',
      lat:51.4962, lon:0.0103, addr:'68 River Way, SE10 0BF',
      text:'Built by a local landowner as the Pilot Inn and Ferry, its name linked to a contemporary nickname for William Pitt the Younger &mdash; &ldquo;the pilot who weathered the storm.&rdquo; It once served a riverside community of tide-mill and, later, power-station workers.\n\nIt stands next to eight Grade II-listed late-Georgian cottages, a rare surviving pocket of artisan housing on a peninsula otherwise rebuilt from scratch.' },

    { id:'fellowship-inn-bellingham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/The_Fellowship_Inn%2C_Bellingham_%2801%29.jpg/330px-The_Fellowship_Inn%2C_Bellingham_%2801%29.jpg', name:'The Fellowship Inn', area:'Bellingham', pc:'SE6', cat:'pub', year:1924, era:'Built 1923&ndash;24, first pub on a London council estate',
      lat:51.43, lon:-0.021, addr:'Randlesdown Road, SE6 3BT',
      text:'Built to serve the new Bellingham estate as post-WWI London tried to relieve overcrowding &mdash; the first pub ever purpose-built on a London council estate. Fleetwood Mac and John Mayall &amp; the Bluesbreakers both played here, and it&rsquo;s on CAMRA&rsquo;s National Inventory of Historic Pub Interiors.\n\nSir Henry Cooper &mdash; already in this gazetteer via his Bellingham plaque &mdash; used the building as a gym while training here for his 1963 fight against Cassius Clay. It closed briefly during the COVID years and reopened in September 2022.' },

    { id:'green-man-blackheath-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Domreiter%2C_Blattmaske.jpg/330px-Domreiter%2C_Blattmaske.jpg', name:'Site of the Green Man', area:'Blackheath Hill', pc:'SE10', cat:'memory', year:1629, era:'Recorded from 1629, demolished 1970',
      lat:51.4725, lon:-0.0081, addr:'Blackheath Hill, SE10 &mdash; demolished, replaced by flats',
      text:'A coaching inn with a legend attached &mdash; supposedly named for Herne the Hunter, with tales of worshippers in cellars beneath it &mdash; that hosted the first recorded toast to Nelson&rsquo;s &ldquo;Immortal Memory&rdquo; on Trafalgar Day, 1811.\n\nA 1960s jazz club here, the Jazzhouse, hosted Ronnie Scott, Paul Simon and a teenage David Bowie; the whole building was demolished in 1970. This marks where it stood, not somewhere to visit.' },

    { id:'royal-albert-new-cross', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/UEL_Docklands_and_Royal_Albert_Dock.jpg/330px-UEL_Docklands_and_Royal_Albert_Dock.jpg', name:'Royal Albert', area:'New Cross Road', pc:'SE14', cat:'pub', year:1858, era:'Trading by 1858, listed 1973',
      lat:51.474, lon:-0.04, addr:'460 New Cross Road, SE14 6TA',
      text:'First recorded in an 1858 Freemasons&rsquo; magazine, it later ran 2000s indie nights that gave early stage time to Bloc Party and Art Brut, drawing on the Goldsmiths crowd down the road.\n\nNow run by Portobello Brewing, it still hosts live jazz, including sets from Nubya Garcia.' },

    { id:'woolwich-pub-bombing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kings_Arms%2C_Woolwich.jpg/330px-Kings_Arms%2C_Woolwich.jpg', name:'The Woolwich pub bombing', area:'Frances Street, Woolwich', pc:'SE18', cat:'memory', year:1974, era:'7 November 1974',
      lat:51.4905, lon:0.0645, addr:'Site of the King\'s Arms, 1 Frances Street, SE18',
      text:'An IRA bomb at the King&rsquo;s Arms killed two people &mdash; Gunner Richard Dunne and sales clerk Alan Horsley &mdash; and injured thirty-five more.\n\nTwo of the Guildford Four were wrongly convicted of this attack in 1975 and served fifteen years before their convictions were quashed in 1989, after the actual Balcombe Street bombers confessed in 1977 &mdash; one of Britain&rsquo;s clearest miscarriages of justice, rooted at this address.' },

    { id:'stanhope-herne-hill-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Herne_Hill_Station_Main_2012.jpg/330px-Herne_Hill_Station_Main_2012.jpg', name:'Herne Hill railway mural', area:'Railton Road, Herne Hill', pc:'SE24', cat:'art', year:2013, era:'Painted 2013, the first of the series',
      lat:51.453, lon:-0.103, addr:'Railway bridge, Railton Road, near Herne Hill station, SE24',
      text:'After a burst water main flooded the area in 2013, Herne Hill traders crowdfunded a vintage-style painted sign for the dingy railway bridge on Railton Road, commissioning the sign writer and film-set painter Lionel Stanhope to brighten it up.\n\nNetwork Rail liked the results enough to start funding further Stanhope bridges itself &mdash; a single flood-recovery sign that grew into a whole genre of South East London street art, eventually reaching Brockley, Forest Hill, Lee, Catford, Nunhead and beyond. It sits just outside this gazetteer&rsquo;s usual postcode range, on the Herne Hill/Dulwich border &mdash; included as a deliberate, small stretch.' },

    { id:'stanhope-brockley-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Brockley_railway_station_MMB_03.jpg/330px-Brockley_railway_station_MMB_03.jpg', name:'Brockley Cross mural', area:'Brockley Cross, Brockley', pc:'SE4', cat:'art', year:2016, era:'Painted c.2016, among the first wave of bridges',
      lat:51.469, lon:-0.037, addr:'Railway bridge, Brockley Cross, SE4',
      text:'Lionel Stanhope painted this vintage-lettered &ldquo;Brockley&rdquo; sign onto the railway bridge at Brockley Cross for his own neighbourhood &mdash; he has lived here since long before Network Rail started funding his work nationally.\n\nIt was one of the first seven Stanhope bridge signs, back when local crowdfunding rather than Network Rail money still paid for them.' },

    { id:'stanhope-forest-hill-walrus', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Forest_Hill_stn_main_building_June_2010.JPG/330px-Forest_Hill_stn_main_building_June_2010.JPG', name:'Forest Hill walrus mural', area:'Waldram Crescent, Forest Hill', pc:'SE23', cat:'art', year:2018, era:'Painted March 2018',
      lat:51.4408, lon:-0.0546, addr:'Railway bridge, Waldram Crescent, SE23',
      text:'A fifty-foot vintage-lettered sign under the railway bridge on Waldram Crescent works a walrus into its design &mdash; a nod to the stuffed Victorian walrus that has anchored the Horniman Museum&rsquo;s taxidermy collection for over a century.\n\nLocal group SE23.life ran the design and colour choice as an online poll before Lionel Stanhope, assisted by Owain Nicholls, painted it &mdash; part of a run of bridge murals he brought to South East London stop by stop.' },

    { id:'stanhope-lee-heron-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Lee_station_building.JPG/330px-Lee_station_building.JPG', name:'Lee railway bridge heron mural', area:'Burnt Ash Hill, Lee', pc:'SE12', cat:'art', year:2018, era:'Painted 2018',
      lat:51.4462, lon:0.0128, addr:'Railway bridge, Burnt Ash Hill, SE12',
      text:'Lionel Stanhope&rsquo;s vintage-style sign on the brick railway abutment beside Lee station works a heron into its lettering, in honour of the birds that nest along the River Quaggy as it runs through nearby Manor House Gardens.\n\nIt was commissioned by the Hither Green Murals community group, who had already brought Stanhope&rsquo;s bridge signs to their own neighbourhood next door.' },

    { id:'stanhope-catford-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Catford_Bridge_stn_building.JPG/330px-Catford_Bridge_stn_building.JPG', name:'Catford Bridge greyhound mural', area:'Catford Bridge', pc:'SE6', cat:'art', year:2018, era:'Painted 2018',
      lat:51.4436, lon:-0.0207, addr:'Railway bridge opposite Catford Bridge station, SE6',
      text:'One of two Lionel Stanhope signs in Catford, this one under the bridge opposite Catford Bridge station runs a pack of yellow greyhounds through its lettering &mdash; a nod to Catford Stadium, the dog track that ran nearby until its last meeting in November 2003.\n\nPaired with the borough&rsquo;s giant fibreglass cat a short walk away on Winslade Way, it means Catford now has street art referencing both halves of its own name.' },

    { id:'stanhope-nunhead-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Nunhead_station_entrance.JPG/330px-Nunhead_station_entrance.JPG', name:'Nunhead railway bridge mural', area:'Consort Road, Nunhead', pc:'SE15', cat:'art', year:2018, era:'Painted 2018',
      lat:51.465, lon:-0.0554, addr:'Railway bridge near Nunhead station, SE15',
      text:'Lionel Stanhope&rsquo;s bold vintage lettering greets travellers near Nunhead station, its design worked carefully around a lamp post bolted to the bridge rather than simply painted over it.\n\nIt stands a short walk from Consort Road&rsquo;s other mural, Faith47&rsquo;s reworking of Guido Reni&rsquo;s Europa and the Bull &mdash; two very different kinds of borrowed image within a few minutes of each other.' },

    { id:'stanhope-burbage-road-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Autumn_on_Burbage_Road%2C_Dulwich_-_geograph.org.uk_-_3229401.jpg/330px-Autumn_on_Burbage_Road%2C_Dulwich_-_geograph.org.uk_-_3229401.jpg', name:'Richard Burbage mural', area:'Burbage Road, Dulwich', pc:'SE24', cat:'art', year:2019, era:'Unveiled 13 May 2019',
      lat:51.4515, lon:-0.0908, addr:'Railway bridge, Burbage Road, SE24',
      text:'Marking four hundred years since the death of Richard Burbage &mdash; the Shakespearean actor the road is named after &mdash; Lionel Stanhope and Owain Nicholls covered the railway bridge in Shakespeare quotations and a portrait of the man himself, Network Rail&rsquo;s fiftieth bridge mural nationally.\n\nA second Stanhope mural went up on the same bridge in 2020, celebrating the cricket, tennis, hockey, squash and croquet played at Dulwich Sports Club next door, and nodding to Sam Mussabini, the Olympic athletics coach who lived on the same road and trained Harold Abrahams of Chariots of Fire.' },

    { id:'stanhope-millwall-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/South_bermondsey_station.JPG/330px-South_bermondsey_station.JPG', name:'Millwall FC mural', area:'Zampa Road, South Bermondsey', pc:'SE16', cat:'art', year:2020, era:'Painted 2020',
      lat:51.4859, lon:-0.0478, addr:'Railway bridge, Zampa Road, SE16',
      text:'Near the approach to The Den, Lionel Stanhope painted Millwall Football Club&rsquo;s leaping-lion crest onto a railway bridge on Zampa Road &mdash; the current badge, reintroduced in 2007 after a spell out of use from 1999.\n\nBy the time he painted it, Stanhope&rsquo;s day job had already taken him from South London brickwork to film and TV sets, including Black Mirror, Humans, The Good Liar and The Courier.' },

    { id:'stanhope-charlton-valley-mural', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Charlton_Station_-_geograph.org.uk_-_234017.jpg/330px-Charlton_Station_-_geograph.org.uk_-_234017.jpg', name:'Charlton Athletic centenary mural', area:'Charlton Church Lane, Charlton', pc:'SE7', cat:'art', year:2020, era:'Painted March 2020',
      lat:51.487, lon:0.0335, addr:'Railway bridge, Charlton Church Lane, SE7',
      text:'Lionel Stanhope and sculptor Zara Gaze marked one hundred years of Charlton Athletic at The Valley with a mural on the bridge outside Charlton station, funded by the Charlton Athletic Museum and painted in graffiti-resistant materials over two days.\n\nIt includes a small tribute reading &ldquo;Seb 1076&rdquo;, for supporter Seb Lewis and the 1,076 consecutive matches he attended before his death.' },

    { id:'affinity-brewing-bermondsey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Affinity_Brew_Co._Tasting_Room%2C_Bermondsey%2C_SE16.jpg/330px-Affinity_Brew_Co._Tasting_Room%2C_Bermondsey%2C_SE16.jpg', name:'Affinity Brewing Co.', area:'Brixton (formerly Bermondsey)', pc:'SE16', cat:'brewery', year:2017, era:'On the Beer Mile 2017&ndash;2020',
      lat:51.4918, lon:-0.0596, addr:'7 Almond Road, South Bermondsey, SE16 3LR',
      text:'A small-batch brewer &mdash; Social Seduction IPA its standout &mdash; that started in a shipping container in Tottenham Hale in 2016 before taking this Almond Road arch at the quiet, southern end of the Beer Mile in 2017. It moved out to a Brixton brewpub in 2020.' },

    { id:'anspach-and-hobday', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Anspach_%26_Hobday%2C_Bermondsey_2026-05-09.jpg/330px-Anspach_%26_Hobday%2C_Bermondsey_2026-05-09.jpg', name:'Anspach &amp; Hobday', area:'Bermondsey', pc:'SE1', cat:'brewery', year:2014, era:'Beer Mile stalwart since 2014',
      lat:51.4986, lon:-0.0734, addr:'118 Druid Street, SE1 2HH (the Arch House Taproom)',
      text:'Known for porters and table beer, this Arch House taproom has been a Beer Mile fixture since 2014 &mdash; even as most of the brewing itself has since moved out to Croydon.' },

    { id:'bianca-road-brewery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Bianca_Road_Brew_Co._Taproom%2C_Bermondsey%2C_SE16.jpg/330px-Bianca_Road_Brew_Co._Taproom%2C_Bermondsey%2C_SE16.jpg', name:'Bianca Road Bakery &amp; Brewery', area:'Bermondsey', pc:'SE16', cat:'brewery', year:2019, era:'On Enid Street since 2019',
      lat:51.4972, lon:-0.0717, addr:'82-84 Enid Street, SE16 3RA',
      text:'West Coast US-inspired beers, including the TropiCali IPA, from a brewery that started in Peckham in 2016 before settling into this two-arch Enid Street site in 2019.' },

    { id:'brew-by-numbers-bermondsey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Brew_by_Numbers%2C_Bermondsey%2C_SE16.jpg/330px-Brew_by_Numbers%2C_Bermondsey%2C_SE16.jpg', name:'Brew By Numbers (Bermondsey)', area:'Bermondsey', pc:'SE16', cat:'brewery', year:2012, era:'Founded 2012, taproom closed 2023',
      lat:51.4975, lon:-0.072, addr:'Arch 79, Enid Street, SE16 3QA',
      text:'Dave Seymour and Tom Hutchings&rsquo; numbered recipe system ran from farmhouse ales to double dry-hopped IPAs out of this Enid Street arch from 2012. The taproom closed in May 2023 when the company went into administration; brewing was later consolidated up in Yorkshire.' },

    { id:'bbno-morden-wharf', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Morden_Wharf_-_geograph.org.uk_-_6996220.jpg/330px-Morden_Wharf_-_geograph.org.uk_-_6996220.jpg', name:'Brew By Numbers Morden Wharf (Greenwich)', area:'Greenwich', pc:'SE10', cat:'brewery', year:2021, era:'Opened 2021, closed 2024',
      lat:51.4938, lon:0.0044, addr:'Southern Warehouse, Morden Wharf Road, SE10 0NU',
      text:'A larger riverside Brew By Numbers site with a beer garden and Canary Wharf views, opened in 2021 when the brewery expanded out from its original Bermondsey arch. It closed in 2024 when the company went into administration and production moved to Yorkshire.' },

    { id:'brick-brewery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Brick_Brewery_Taproom%2C_Peckham%2C_SE15.jpg/330px-Brick_Brewery_Taproom%2C_Peckham%2C_SE15.jpg', name:'Brick Brewery', area:'Peckham / Deptford', pc:'SE15', cat:'brewery', year:2013, era:'Taproom under the arches since 2013',
      lat:51.4697, lon:-0.0696, addr:'209 Blenheim Grove, SE15 4QL',
      text:'A Peckham Rye taproom institution under the station arches since 2013, known for Peckham Session IPA and Tamarind &amp; Lime Leaf sours &mdash; even as the actual brewing has moved on, first to Deptford, then to Yorkshire.' },

    { id:'brockley-brewery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/The_Brockley_Brewing_Company_Ltd_-_geograph.org.uk_-_5994993.jpg/330px-The_Brockley_Brewing_Company_Ltd_-_geograph.org.uk_-_5994993.jpg', name:'Brockley Brewery', area:'Brockley', pc:'SE4', cat:'brewery', year:2013, era:'Founded 2013 by seven partners',
      lat:51.4623, lon:-0.0362, addr:'31 Harcourt Road, SE4 2AJ',
      text:'A well-regarded local brewery going beyond standard IPAs and lagers into cask ales and bottled beers, founded by seven partners in 2013.' },

    { id:'cloudwater-bermondsey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Cloudwater_Tap_Room%2C_Bermondsey_2025-08-30.jpg/330px-Cloudwater_Tap_Room%2C_Bermondsey_2025-08-30.jpg', name:'Cloudwater', area:'Bermondsey', pc:'SE16', cat:'brewery', year:2018, era:'London taproom since 2018',
      lat:51.4977, lon:-0.0726, addr:'73 Enid Street, SE16 3RA',
      text:'A Manchester brewery&rsquo;s London taproom on the Beer Mile, trading from this Enid Street arch since 2018.' },

    { id:'fourpure-brewing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fourpure_Brewing_Co._Bermondsey_Trading_Estate%2C_Bermondsey%2C_London.jpg/330px-Fourpure_Brewing_Co._Bermondsey_Trading_Estate%2C_Bermondsey%2C_London.jpg', name:'Fourpure Brewing', area:'Bermondsey', pc:'SE16', cat:'brewery', year:2013, era:'Founded 2013, closed 2024',
      lat:51.4891, lon:-0.0563, addr:'25 Bermondsey Trading Estate, Rotherhithe New Road, SE16 3LL',
      text:'Brothers Dan and Tom Lowe founded one of the original Bermondsey Beer Mile breweries here in 2013, known for its core lagers and IPAs. It ceased brewing and closed in September 2024.' },

    { id:'gipsy-hill-brewing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Hamilton_Road%2C_West_Norwood_-_geograph.org.uk_-_4607302.jpg/330px-Hamilton_Road%2C_West_Norwood_-_geograph.org.uk_-_4607302.jpg', name:'Gipsy Hill Brewing Co.', area:'Gipsy Hill / Crystal Palace', pc:'SE27', cat:'brewery', year:2014, era:'Founded 2014',
      lat:51.4287, lon:-0.0896, addr:'Unit 11, 160 Hamilton Road, SE27 9SF',
      text:'Founded in 2014 and employee-owned since 2021, one of London&rsquo;s largest independent breweries runs an on-site taproom here plus a smaller micro-bar, the Douglas Fir, nearer Crystal Palace itself.' },

    { id:'gosnells-bermondsey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Gosnells%2C_Bermondsey_2025-08-30.jpg/330px-Gosnells%2C_Bermondsey_2025-08-30.jpg', name:'Gosnells', area:'Bermondsey', pc:'SE16', cat:'brewery', year:2022, era:'Taproom here 2022&ndash;2026',
      lat:51.4978, lon:-0.0727, addr:'72 Enid Street, SE16 3RD',
      text:'The UK&rsquo;s only dedicated mead bar and brewery opened this Enid Street taproom in September 2022. It closed its Peckham brewery and moved out of this site around May 2026, when Big Hug Brewing took over the arch.' },

    { id:'hiver-beers', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hiver_Beers_Taproom%2C_Bermondsey%2C_SE16.jpg/330px-Hiver_Beers_Taproom%2C_Bermondsey%2C_SE16.jpg', name:'Hiver Beers', area:'Bermondsey', pc:'SE1', cat:'brewery', year:2013, era:'Founded 2013',
      lat:51.4988, lon:-0.0747, addr:'Arch 56, Stanworth Street, SE1 3NY',
      text:'Honey beers made with British beekeepers &mdash; Blonde, Amber and a Session IPA &mdash; from a brewery that started life as a stall on Maltby Street before taking this Stanworth Street arch.' },

    { id:'hop-stuff-woolwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/London-Woolwich%2C_Royal_Arsenal%2C_Hopstuff_brewery.jpg/330px-London-Woolwich%2C_Royal_Arsenal%2C_Hopstuff_brewery.jpg', name:'Hop Stuff Brewery', area:'Woolwich', pc:'SE18', cat:'brewery', year:2013, era:'Crowdfunded 2013, closed 2019',
      lat:51.4931, lon:0.0757, addr:'Unit 7 Gunnery Terrace, Cornwallis Road, SE18 6SW',
      text:'James and Emma Yeomans crowdfunded this original Hop Stuff taproom and brewery in the Royal Arsenal in 2013. It went into administration in 2019, with the Hop Stuff name and assets later bought by Molson Coors.' },

    { id:'kanpai-london', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Kanpai_London_Sake%2C_Bermondsey_2025-08-30.jpg/330px-Kanpai_London_Sake%2C_Bermondsey_2025-08-30.jpg', name:'Kanpai London', area:'Bermondsey', pc:'SE1', cat:'brewery', year:2016, era:'Founded 2016, moved to the Beer Mile 2023',
      lat:51.5005, lon:-0.077, addr:'48 Druid Street, SE1 2EZ',
      text:'The UK&rsquo;s first sake brewery, founded in Peckham in 2016 and relocated to this Druid Street arch in 2023.' },

    { id:'meantime-brewing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Meantime_Brewing%2C_Greenwich%2C_SE10.jpg/330px-Meantime_Brewing%2C_Greenwich%2C_SE10.jpg', name:'Meantime Brewing Co.', area:'Greenwich', pc:'SE10', cat:'brewery', year:1999, era:'Founded 1999, closed 2024',
      lat:51.489, lon:0.0086, addr:'Lawrence Trading Estate, Blackwall Lane, SE10 0AR',
      text:'Alastair Hook founded this state-of-the-art brewery in 1999, with tours, tasting rooms and a brewery shop drawing visitors to the Greenwich site for a quarter of a century. It closed in 2024 when owner Asahi moved production to Fuller&rsquo;s Chiswick brewery.' },

    { id:'moor-beer-bermondsey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Moor_Vaults_and_Tap_Room%2C_Bermondsey_2025-08-30.jpg/330px-Moor_Vaults_and_Tap_Room%2C_Bermondsey_2025-08-30.jpg', name:'Moor Beer', area:'Bermondsey', pc:'SE16', cat:'brewery', year:2017, era:'Taproom here 2017&ndash;2026',
      lat:51.4978, lon:-0.0727, addr:'71 Enid Street, SE16 3RA',
      text:'A Bristol-rooted brewery known for natural, live-yeast, vegan-friendly beers, trading from this Enid Street arch from Christmas 2017 until early 2026, when the site was sold and reopened as a live-music bar, the Blue Monk.' },

    { id:'southey-brewing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Penge_High_Street_-_geograph.org.uk_-_4712820.jpg/330px-Penge_High_Street_-_geograph.org.uk_-_4712820.jpg', name:'Southey Brewing', area:'Penge', pc:'SE20', cat:'brewery', year:2016, era:'Reopened 2016 in a former brewery\'s warehouse',
      lat:51.4153, lon:-0.0523, addr:'21 Southey Street, SE20 7JD',
      text:'A small-batch brewery in a Victorian warehouse that was once an abattoir and a candle factory before another brewery, Late Knights, set up here in 2013. Late Knights folded in 2016 and Southey restarted brewing on the same site that December, with its taproom opening in 2018.' },

    { id:'southwark-brewing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Southwark_Brewing_Co._Tap_Room%2C_Bermondsey%2C_SE1.jpg/330px-Southwark_Brewing_Co._Tap_Room%2C_Bermondsey%2C_SE1.jpg', name:'Southwark Brewing Co.', area:'Bermondsey', pc:'SE1', cat:'brewery', year:2014, era:'Founded 2014, the Beer Mile\'s first cask specialist',
      lat:51.5006, lon:-0.0771, addr:'46 Druid Street, SE1 2EZ',
      text:'Peter Jackson and Andy Nichol founded the Beer Mile&rsquo;s first cask-focused brewery in this railway arch in 2014, with Sean Franklin as master brewer &mdash; a common starting point for organised tasting tours ever since.' },

    { id:'taproom-se8', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Taproom_SE8%2C_Deptford%2C_SE8.jpg/330px-Taproom_SE8%2C_Deptford%2C_SE8.jpg', name:'Taproom SE8 (Hop Stuff)', area:'Deptford', pc:'SE8', cat:'brewery', year:2017, era:'Opened 2017, rebranded Salt Deptford 2021',
      lat:51.4785, lon:-0.0269, addr:'Unit 2, St Paul\'s House, 3 Market Yard, SE8 4BX',
      text:'Hop Stuff Brewery&rsquo;s second taproom opened in Deptford Market Yard in December 2017. Salt of Yorkshire acquired it in 2021 and rebranded the site Salt Deptford, though the arch itself is the same one that opened as Taproom SE8.' },

    { id:'kernel-brewery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Kernel_Brewery_Arch_7_Taproom%2C_Bermondsey%2C_SE16.jpg/330px-Kernel_Brewery_Arch_7_Taproom%2C_Bermondsey%2C_SE16.jpg', name:'The Kernel Brewery', area:'Bermondsey', pc:'SE16', cat:'brewery', year:2010, era:'Founded 2010, moved here 2012',
      lat:51.4957, lon:-0.0685, addr:'Arch 11, Dockley Road Industrial Estate, SE16 3SF',
      text:'One of the breweries that kick-started the Bermondsey Beer Mile &mdash; understated labels, celebrated table beer, porters and IPAs. Started on Druid Street in 2010 before moving to this Dockley Road arch in 2012.' },

    { id:'up-the-creek-microbrewery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Up_the_Creek_comedy_club%2C_London_SE10.jpg/330px-Up_the_Creek_comedy_club%2C_London_SE10.jpg', name:'Up the Creek microbrewery', area:'Greenwich', pc:'SE10', cat:'brewery', year:2018, era:'Brewing since 2018',
      lat:51.4813, lon:-0.0116, addr:'302 Creek Road, SE10 9SW',
      text:'A small cask microbrewery built into the Up the Creek comedy club, which opened in 1991. Brewing began on a three-barrel plant in 2018 &mdash; Greenwich Blonde, Gravedigger stout.' },

    { id:'villages-brewery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Villages_Brewery_Tap_Room%2C_Deptford%2C_SE8.jpg/330px-Villages_Brewery_Tap_Room%2C_Deptford%2C_SE8.jpg', name:'Villages Brewery', area:'Deptford', pc:'SE8', cat:'brewery', year:2016, era:'Founded 2016 by brothers Archie and Louis Village',
      lat:51.4785, lon:-0.0245, addr:'21-22 Resolution Way, SE8 4NT',
      text:'An under-the-arches taproom brewing unfiltered lager, pale ale, fruited sours and porters, founded by brothers Archie and Louis Village.' },

    { id:'zerodegrees-blackheath', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Zerodegrees%2C_Blackheath%2C_SE3.jpg/330px-Zerodegrees%2C_Blackheath%2C_SE3.jpg', name:'Zerodegrees', area:'Blackheath', pc:'SE3', cat:'brewery', year:2000, era:'Brewing since 2000',
      lat:51.4676, lon:0.0083, addr:'29-31 Montpelier Vale, SE3 0TJ',
      text:'A microbrewery built into a pizza restaurant on Blackheath Village&rsquo;s high street, brewing wheat beer, pilsner, pale ale and a mango beer since 2000 &mdash; a brewpub that predates the whole &ldquo;craft beer&rdquo; wave by well over a decade.' },

    { id:'family-outing-statue', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/%22Family_Outing%22_Sculpture_in_Bexleyheath.jpg/330px-%22Family_Outing%22_Sculpture_in_Bexleyheath.jpg', name:'"Family Outing" statue', area:'Bexleyheath', pc:'DA6', cat:'art', year:1985, era:'Unveiled 1985',
      lat:null, lon:null, addr:'',
      text:'A bronze statue by local artist John Ravera, commissioned by Norwich Union and unveiled in 1985 outside the Broadway Shopping Centre. It depicts an ordinary family on an outing, a gentle, human counterpoint to the area\'s civic clock tower nearby.' },

    { id:'nothing-without-industry-sign', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/16_Brownhill_Road%2C_Catford%2C_LB_Lewisham_1.11.2021.jpg/330px-16_Brownhill_Road%2C_Catford%2C_LB_Lewisham_1.11.2021.jpg', name:'"Nothing Without Industry" sign', area:'Catford', pc:'SE6', cat:'art', year:null, era:'',
      lat:null, lon:null, addr:'16 Brownhill Road',
      text:'A painted sign bearing Catford\'s old civic motto, "Nothing Without Industry," displayed at 16 Brownhill Road. It is a small surviving piece of the area\'s civic identity from an era when local mottoes and slogans were a common feature of English town and borough branding, tucked away as an easily missed curiosity for anyone who knows to look for it.' },

    { id:'adam-newton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Newton%2C_Adam.jpg/330px-Newton%2C_Adam.jpg', name:'Adam Newton', area:'Charlton', pc:'SE7', cat:'resident', year:1607, era:'Built Charlton House 1607&ndash;1612',
      lat:null, lon:null, addr:'',
      text:'Tutor to Prince Henry, son of James I, who built the Jacobean mansion Charlton House between 1607 and 1612 as his own residence in the area. Prince Henry died in 1612 and never lived there himself, but the house Newton built remains Charlton\'s most significant landmark.' },

    { id:'alexander-fleming-house-metro-central-heights', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Metro_Central_Heights_Alexander_Fleming_House.jpg/330px-Metro_Central_Heights_Alexander_Fleming_House.jpg', name:'Alexander Fleming House / Metro Central Heights', area:'Elephant &amp; Castle', pc:'SE1', cat:'grand', year:1959, era:'Built 1959',
      lat:null, lon:null, addr:'',
      text:'A Brutalist landmark built in 1959 as a group of government office blocks, designed by the Hungarian modernist architect Ernő Goldfinger &mdash; whose name later inspired the Bond villain of the same surname. It has since been converted into the residential complex known as Metro Central Heights, remaining one of the area\'s most architecturally significant post-war buildings.' },

    { id:'alexander-mcqueen', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Alexander_McQueen_by_FashionWirePress.jpg/330px-Alexander_McQueen_by_FashionWirePress.jpg', name:'Alexander McQueen', area:'Catford / Lewisham', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Fashion designer recorded as having been born in Lewisham; some local accounts also place his early life within Catford specifically, though this connection is less firmly documented than for other names on this list. One of Britain\'s most influential and provocative designers before his death in 2010.' },

    { id:'alfred-and-ada-salter', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ada_Salter.jpg/330px-Ada_Salter.jpg', name:'Alfred and Ada Salter', area:'Bermondsey', pc:'SE16', cat:'resident', year:1922, era:'Active early 20th century; Ada elected Mayor 1922',
      lat:null, lon:null, addr:'',
      text:'Dr Alfred Salter and Ada Salter were a husband-and-wife pair of social reformers who dedicated their lives to improving conditions in Bermondsey\'s slums in the early 20th century. Alfred, a doctor and later MP, provided free healthcare to the poor, while Ada became Britain\'s first female mayor of a London borough when elected Mayor of Bermondsey in 1922, pioneering slum clearance, public health reform and the planting of trees and gardens across the borough that earned it the nickname "Bermondsey the Beautiful."' },

    { id:'andy-mcnab', img:'', name:'Andy McNab', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Former Special Air Service (SAS) soldier and bestselling author, born in Catford. He became one of Britain\'s most widely read military writers following the publication of Bravo Two Zero, his account of an SAS patrol during the 1991 Gulf War, and has since built a long career writing military thrillers.' },

    { id:'anthony-jones', img:'', name:'Anthony Jones', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Art photographer who lives in the Catford area, part of the borough\'s contemporary creative community.' },

    { id:'ben-elton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/BenElton.jpg/330px-BenElton.jpg', name:'Ben Elton', area:'Catford', pc:'SE6', cat:'resident', year:1959, era:'Born 1959',
      lat:null, lon:null, addr:'',
      text:'Comedian, actor and writer born in Catford in 1959. He became one of the leading figures of the 1980s "alternative comedy" boom, co-writing Blackadder and The Young Ones, before building a prolific second career as a novelist and musical writer, including co-writing the jukebox musical We Will Rock You.' },

    { id:'bernard-sunley', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Bernard_Sunley_1910-1964_Contractor_and_philanthropist_lived_and_worked_here_1941-1958.jpg/330px-Bernard_Sunley_1910-1964_Contractor_and_philanthropist_lived_and_worked_here_1941-1958.jpg', name:'Bernard Sunley', area:'Catford', pc:'SE6', cat:'resident', year:1910, era:'Born 1910',
      lat:null, lon:null, addr:'',
      text:'Property developer and philanthropist, born in Catford in 1910. He built one of Britain\'s largest post-war construction companies and established the Bernard Sunley Charitable Foundation, which continues to fund charitable causes across the UK today.' },

    { id:'bernie-ecclestone', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Bernie_Ecclestone%2C_S%C3%A3o_Paulo_2022_%2852498924277%29_%28cropped%29.jpg/330px-Bernie_Ecclestone%2C_S%C3%A3o_Paulo_2022_%2852498924277%29_%28cropped%29.jpg', name:'Bernie Ecclestone', area:'Bexleyheath', pc:'DA6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Formula 1 magnate and billionaire businessman, who grew up on Danson Road in Bexleyheath. Ecclestone went on to control the commercial rights to Formula 1 for decades, transforming it into the global sport it is today, before selling his stake for a reported &pound;6 billion.' },

    { id:'boris-karloff', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Boris_Karloff.jpg/330px-Boris_Karloff.jpg', name:'Boris Karloff', area:'Camberwell', pc:'SE5', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Actor associated with Camberwell, best known for defining the visual image of Frankenstein\'s monster in the classic 1931 film, going on to become one of the most recognisable horror stars of Hollywood\'s golden age.' },

    { id:'boudica-s-reputed-last-stand-at-one-tree-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/The_Honor_Oak%2C_One_Tree_Hill.JPG/330px-The_Honor_Oak%2C_One_Tree_Hill.JPG', name:'Boudica\'s reputed last stand at One Tree Hill', area:'Honor Oak', pc:'SE23', cat:'memory', year:null, era:'Legendary connections, unverified',
      lat:null, lon:null, addr:'',
      text:'One Tree Hill is reputed &mdash; though not proven &mdash; to be the site of Queen Boudica\'s final defeat by the Romans in 61 AD, and separately carries a local legend that the highwayman Dick Turpin used its height as a lookout post. Neither claim is firmly documented, but both have become durably attached to the hill\'s identity alongside its more reliably sourced connection to Elizabeth I, who is reputed to have picnicked under the oak tree that gave the area its name.' },

    { id:'brian-willsher', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sculptural_puzzle_by_Brian_Willsher.jpg/330px-Sculptural_puzzle_by_Brian_Willsher.jpg', name:'Brian Willsher', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Wood and bronze sculptor, born and based in Catford throughout his working life, known for figurative sculptural work across both materials.' },

    { id:'broadway-theatre', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Broadway_Theatre_-_Catford.jpg/330px-Broadway_Theatre_-_Catford.jpg', name:'Broadway Theatre', area:'Catford', pc:'SE6', cat:'grand', year:1932, era:'Opened 1932',
      lat:null, lon:null, addr:'Rushey Green / Catford Broadway, adjoining the old Town Hall',
      text:'An Art Deco building adjoining Catford\'s old Town Hall, opened in 1932 as a Concert Hall and now Grade II listed. Its curved stone exterior is decorated with shields and heraldic emblems beneath a distinctive copper dome, while the interior retains its original Art Deco detailing throughout. It continues to operate today as a working theatre, hosting plays, musicals, comedy and community productions for the borough.' },

    { id:'captain-william-colbeck', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Will-colbeck.jpg/330px-Will-colbeck.jpg', name:'Captain William Colbeck', area:'Catford', pc:'SE6', cat:'resident', year:1871, era:'1871&ndash;1930',
      lat:null, lon:null, addr:'Inchmery Road',
      text:'Antarctic explorer and Royal Navy captain who lived on Inchmery Road in Catford; his sons attended nearby St Dunstan\'s College. Colbeck served on both the Discovery and Morning relief expeditions during the heroic age of Antarctic exploration in the early 1900s.' },

    { id:'catford-bridge-tavern', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Catford_Bridge_Tavern%2C_Catford%2C_SE6_%287017172145%29.jpg/330px-Catford_Bridge_Tavern%2C_Catford%2C_SE6_%287017172145%29.jpg', name:'Catford Bridge Tavern', area:'Catford', pc:'SE6', cat:'pub', year:null, era:'Rebuilt and reopened 2017 after a 2015 fire',
      lat:null, lon:null, addr:'Near Catford Bridge station',
      text:'A mock-Tudor pub standing close to the site of the former Catford Stadium dog track. It was destroyed by a serious fire in March 2015 but was rebuilt and reopened in April 2017, restoring a long-standing local drinking spot that had served the area around Catford Bridge station for decades.' },

    { id:'catford-cycling-club-track', img:'', name:'Catford Cycling Club track', area:'Catford', pc:'SE6', cat:'works', year:1894, era:'Club founded 1886; track built 1894',
      lat:null, lon:null, addr:'South of Brownhill Road',
      text:'Catford Cycling Club was founded in 1886, making it one of the older cycling clubs in England, and in 1894 the club built its own banked racing track south of Brownhill Road, complete with a distinctive pagoda-style grandstand. By the 1950s most of the track had been built over by later development, but the club itself survived and continues to operate to this day.' },

    { id:'charles-babbage', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Charles_Babbage_-_1860.jpg/330px-Charles_Babbage_-_1860.jpg', name:'Charles Babbage', area:'Walworth', pc:'SE17', cat:'resident', year:1791, era:'Born 1791',
      lat:null, lon:null, addr:'',
      text:'Mathematician and inventor widely regarded as a father of computing for his designs for the Difference Engine and Analytical Engine, born in Walworth in 1791 and baptised at St Mary\'s, Newington. His family lived at 44 Crosby Row, now Larcom Street, where a blue plaque marks the corner of Larcom Street and Walworth Road.' },

    { id:'charles-dickens-and-ellen-ternan-in-nunhead', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ellen_Ternan.jpeg/330px-Ellen_Ternan.jpeg', name:'Charles Dickens and Ellen Ternan in Nunhead', area:'Nunhead', pc:'SE15', cat:'resident', year:null, era:'Dickens\'s final years, d. 1870',
      lat:null, lon:null, addr:'',
      text:'Charles Dickens rented Windsor Lodge, at 31 Linden Grove, as a home for his mistress Ellen "Nelly" Ternan during the final years of his life. According to Claire Tomalin\'s biography of Ternan, Dickens was reputedly taken from this house on his final journey to Gad\'s Hill Place, where he died in 1870. The house itself no longer stands, but the connection remains one of Nunhead\'s more unexpected literary footnotes.' },

    { id:'charles-tupper', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Charles_Tupper_photographic_portrait.jpg/330px-Charles_Tupper_photographic_portrait.jpg', name:'Charles Tupper', area:'Bexleyheath', pc:'DA6', cat:'resident', year:1821, era:'1821&ndash;1915',
      lat:null, lon:null, addr:'',
      text:'Canada\'s sixth Prime Minister, who spent his retirement years living in Bexleyheath. His presence gives this quiet corner of South East London an unlikely direct connection to 19th-century Canadian political history.' },

    { id:'chris-welch', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chris_Welch_May_2023.jpg/330px-Chris_Welch_May_2023.jpg', name:'Chris Welch', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Music journalist and author, raised in Catford, who became a prominent voice in the British music press, writing about the rock scene from the 1960s onward for outlets including Melody Maker.' },

    { id:'christ-church-bexleyheath', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Christ_Church%2C_Bexleyheath_02.jpg/330px-Christ_Church%2C_Bexleyheath_02.jpg', name:'Christ Church, Bexleyheath', area:'Bexleyheath', pc:'DA6', cat:'grand', year:1841, era:'Dates from 1841; current building 1877',
      lat:null, lon:null, addr:'',
      text:'Bexleyheath\'s parish church, dating from 1841 with the current building completed in 1877 once the area became its own ecclesiastical parish in 1866. It stands on Broadway at the heart of the town, one of fifteen churches now serving Bexleyheath but the one most closely tied to the town\'s own founding.' },

    { id:'christopher-marlowe', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Christopher_Marlowe.jpg/330px-Christopher_Marlowe.jpg', name:'Christopher Marlowe', area:'Deptford', pc:'SE8', cat:'resident', year:1593, era:'Killed 1593',
      lat:null, lon:null, addr:'',
      text:'Elizabethan playwright and contemporary rival of Shakespeare, author of Doctor Faustus and Tamburlaine, who was stabbed to death during a brawl at a house on Deptford Strand in May 1593. The circumstances of his death remain debated by historians and conspiracy theorists alike; he was buried in an unmarked grave in the churchyard of St Nicholas, Deptford, where a modern memorial now commemorates him.' },

    { id:'claude-rains', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Claude_Rains_by_Elmer_Fryer.jpg/330px-Claude_Rains_by_Elmer_Fryer.jpg', name:'Claude Rains', area:'Camberwell', pc:'SE5', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Actor associated with Camberwell, celebrated for his stage and screen career including an Academy Award nomination and a Tony Award, with notable film roles including The Invisible Man and Casablanca.' },

    { id:'cuckold-s-point', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cuckold%27s_Point.png/330px-Cuckold%27s_Point.png', name:'Cuckold\'s Point', area:'Rotherhithe', pc:'SE16', cat:'maritime', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'A sharp bend in the Thames on the Rotherhithe peninsula, once marked by a tall pole topped with a pair of horns, from which revellers bound for the raucous Charlton Horn Fair would disembark every 18 October before parading on to Charlton. The name and the horned marker both nod to the fair\'s legendary origin story involving a wronged miller and a king\'s guilty conscience.' },

    { id:'del-boy-and-rodney-trotter-only-fools-and-horses', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/1971_Reliant_Regal_Supervan_III_-_Trotter%27s_car_%285962573643%29.jpg/330px-1971_Reliant_Regal_Supervan_III_-_Trotter%27s_car_%285962573643%29.jpg', name:'Del Boy and Rodney Trotter (Only Fools and Horses)', area:'Peckham', pc:'SE15', cat:'art', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Derek "Del Boy" and Rodney Trotter, the fictional market-trader brothers of the BBC sitcom Only Fools and Horses, are among the best-known fictional residents of Peckham, cementing the area\'s identity in British popular culture for decades even though the show\'s exterior filming largely took place elsewhere. The sitcom\'s lasting association with Peckham means the area is still sometimes referenced through the Trotters\' misadventures, in much the same way other South East London areas carry their own fictional or folkloric characters.' },

    { id:'delia-smith', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Delia_%26_Michael_with_Capital_Canaries_T-Shirts.jpg/330px-Delia_%26_Michael_with_Capital_Canaries_T-Shirts.jpg', name:'Delia Smith', area:'Bexleyheath', pc:'DA6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Television cook and food writer who grew up in Bexleyheath and attended Bexleyheath School. Smith became one of Britain\'s most influential culinary figures, credited with teaching a generation of home cooks through her books and television series from the 1970s onward.' },

    { id:'dulwich-s-great-plague-burials', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Dulwich_Old_Burial_Ground_-_geograph.org.uk_-_1260097.jpg/330px-Dulwich_Old_Burial_Ground_-_geograph.org.uk_-_1260097.jpg', name:'Dulwich\'s Great Plague burials', area:'Dulwich', pc:'SE21', cat:'memory', year:null, era:'Plague years 1625 and 1655',
      lat:null, lon:null, addr:'',
      text:'Dulwich\'s burial ground holds victims of the Great Plague from both 1625 and 1655, with a death rate in the small village matching that of the City of London itself &mdash; roughly one in every six residents. The dead include a number of "nurse children," infants farmed out to wet-nurses in rural Dulwich between 1700 and 1820, a once-common practice for well-off London families.' },

    { id:'edward-iii-s-bermondsey-manor-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/King_Edward_III_Manor_House%2C_Bermondsey_1.jpg/330px-King_Edward_III_Manor_House%2C_Bermondsey_1.jpg', name:'Edward III\'s Bermondsey manor house', area:'Bermondsey', pc:'SE16', cat:'grand', year:1353, era:'Built 1353',
      lat:null, lon:null, addr:'',
      text:'King Edward III had a riverside manor house built in Bermondsey in 1353; its excavated foundations remain visible today next to Bermondsey Wall East, close to the historic Angel public house, making it one of the oldest traceable structures in the area\'s long history.' },

    { id:'enid-blyton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Enid_Blyton_c._1923.jpg/330px-Enid_Blyton_c._1923.jpg', name:'Enid Blyton', area:'East Dulwich', pc:'SE22', cat:'resident', year:1897, era:'Born 1897',
      lat:null, lon:null, addr:'',
      text:'Children\'s author Enid Blyton was born at 354 Lordship Lane, East Dulwich, on 11 August 1897, shortly before her family moved to Beckenham. Blyton went on to become one of the best-selling and most translated children\'s authors in history, known for the Famous Five, Secret Seven and Noddy series.' },

    { id:'ernest-dowson', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Ernest_Dowson.jpg/330px-Ernest_Dowson.jpg', name:'Ernest Dowson', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'1867&ndash;1900',
      lat:null, lon:null, addr:'',
      text:'Poet and prominent figure of the 1890s Decadent movement, who lived and died in Catford. Dowson coined two phrases that entered the English language directly from his poetry &mdash; "days of wine and roses" and "gone with the wind" &mdash; the latter later adopted as the title of Margaret Mitchell\'s novel and its famous film adaptation, without most people realising its Catford origins.' },

    { id:'eros-house', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Eros_House_%289175916827%29.jpg/330px-Eros_House_%289175916827%29.jpg', name:'Eros House', area:'Catford', pc:'SE6', cat:'grand', year:1962, era:'Built 1962',
      lat:null, lon:null, addr:'Brownhill Road',
      text:'A Brutalist office block built in 1962 by architect Owen Luder on the site of the demolished Hippodrome cinema. Critic Ian Nairn praised it in his day as "a monster sat down in Catford and just what the place needed," admiring its raw concrete forms, projecting frames and boxed-out bow windows, and noting a staircase tower that seems to lean. It remains one of the borough\'s most distinctive &mdash; and divisive &mdash; pieces of post-war architecture, and its 1960s ambition set the tone for the Catford Cat and Milford Towers that followed.' },

    { id:'ethel-le-neve', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hawley_Harvey_Crippen_and_Ethel_Le_Neve._Photograph_by_Arthu_Wellcome_V0026226.jpg/330px-Hawley_Harvey_Crippen_and_Ethel_Le_Neve._Photograph_by_Arthu_Wellcome_V0026226.jpg', name:'Ethel Le Neve', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'Trial and acquittal, 1910',
      lat:null, lon:null, addr:'',
      text:'The mistress of Dr Hawley Harvey Crippen, who was hanged in 1910 for the murder of his wife, Cora Crippen, in one of the most notorious criminal cases of Edwardian Britain. Le Neve herself was tried as an accessory but was acquitted, and later lived under a changed identity; her connection to Catford comes from residing in the area in the years that followed the case.' },

    { id:'excalibur-estate', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Excalibur-estate-catford.jpg/330px-Excalibur-estate-catford.jpg', name:'Excalibur Estate', area:'Bellingham (south of Catford)', pc:'SE6', cat:'grand', year:1945, era:'Built at the end of WWII, c.1945',
      lat:null, lon:null, addr:'Bellingham',
      text:'A 186-bungalow prefabricated housing estate laid out at the end of the Second World War to provide fast, low-cost homes for a population left homeless by the Blitz. By 2011 it had become the largest surviving prefab estate in Britain, a rare intact example of a once-common form of emergency post-war housing. Six of its bungalows were given Grade II listing in recognition of their historical importance, though most of the rest of the estate was subsequently demolished as part of a redevelopment and rebuilding scheme.' },

    { id:'frank-pullen', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Frank_Henry_Pullen.jpg/330px-Frank_Henry_Pullen.jpg', name:'Frank Pullen', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Property developer and racehorse owner, born in Catford, who opened the first of his retail shops on Catford Broadway before building it into a much wider business empire.' },

    { id:'frederick-john-horniman', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Frederick_John_Horniman_0001.jpg/330px-Frederick_John_Horniman_0001.jpg', name:'Frederick John Horniman', area:'Forest Hill', pc:'SE23', cat:'resident', year:1901, era:'Museum gifted to the public 1901',
      lat:null, lon:null, addr:'',
      text:'Tea trader and collector whose personal collection of natural history specimens, cultural artefacts and musical instruments formed the basis of the Horniman Museum, which he had purpose-built and gifted to the public in 1901. Horniman lived in Forest Hill, giving the area one of London\'s most distinctive free museums.' },

    { id:'george-arthur-knowland-vc', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/George_Knowland_VC.jpg/330px-George_Knowland_VC.jpg', name:'George Arthur Knowland VC', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Recipient of the Victoria Cross, the British and Commonwealth armed forces\' highest award for gallantry, awarded posthumously for actions during the Second World War in the Burma campaign.' },

    { id:'george-arthur-roberts', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/George_Arthur_Roberts.jpg/330px-George_Arthur_Roberts.jpg', name:'George Arthur Roberts', area:'New Cross', pc:'SE14', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Pioneering Black firefighter stationed at New Cross Fire Station during the Second World War, credited as the founder of the fire service\'s discussion and education groups &mdash; an early and influential push for structured internal debate and training within the wartime fire brigade.' },

    { id:'henry-cooper', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Henry_Cooper_1969.jpg/330px-Henry_Cooper_1969.jpg', name:'Henry Cooper', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'British heavyweight boxer who came from the Catford area, best known for twice fighting Muhammad Ali (then Cassius Clay) and for the left hook, nicknamed "\'Enry\'s \'Ammer," that famously floored Ali during their 1963 bout at Wembley. He went on to become one of British boxing\'s most beloved figures and a popular TV and advertising personality in later life.' },

    { id:'henry-forster-1st-baron-forster', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Henry_Forster%2C_1st_Baron_Forster_circa_1925.jpg/330px-Henry_Forster%2C_1st_Baron_Forster_circa_1925.jpg', name:'Henry Forster, 1st Baron Forster', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Politician after whom Forster Park in Catford is named, reflecting his connection to the local area alongside a wider career in British and Australian politics (he served as Governor-General of Australia).' },

    { id:'henry-kelsey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Henry_Kelsey_sees_the_buffalo_on_the_western_plains.jpg/330px-Henry_Kelsey_sees_the_buffalo_on_the_western_plains.jpg', name:'Henry Kelsey', area:'Greenwich', pc:'SE10', cat:'resident', year:1667, era:'c.1667&ndash;1724',
      lat:null, lon:null, addr:'',
      text:'Early English explorer of Canada, born and married in East Greenwich around 1667. Kelsey travelled deep into the Canadian interior for the Hudson\'s Bay Company, becoming one of the first Europeans to see the northern Great Plains, and is buried at St Alfege\'s Church, Greenwich.' },

    { id:'henry-oldenburg', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Jan_van_Cleve_%28III%29_-_Portrait_of_Henry_Oldenburg.jpg/330px-Jan_van_Cleve_%28III%29_-_Portrait_of_Henry_Oldenburg.jpg', name:'Henry Oldenburg', area:'Bexley', pc:'DA5', cat:'resident', year:1677, era:'Died 1677',
      lat:null, lon:null, addr:'',
      text:'German-born natural philosopher and the first Secretary of the Royal Society, a role in which he corresponded with most of the leading scientific figures of his era, including Isaac Newton and Robert Boyle. He died in 1677 and was buried in the churchyard of St Mary the Virgin, Bexley.' },

    { id:'horatio-henry-couldery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Horatio_Henry_Couldery_-_The_Unexpected_Guest.jpg/330px-Horatio_Henry_Couldery_-_The_Unexpected_Guest.jpg', name:'Horatio Henry Couldery', area:'Lewisham', pc:'SE13', cat:'resident', year:1832, era:'1832&ndash;1893',
      lat:null, lon:null, addr:'',
      text:'Animal artist born in Lewisham in 1832, noted particularly for his paintings of cats, kittens and dogs, which found a wide popular audience in Victorian Britain.' },

    { id:'hubert-bland-and-edith-nesbit', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Hubert_Bland.PNG/330px-Hubert_Bland.PNG', name:'Hubert Bland and Edith Nesbit', area:'Eltham', pc:'SE9', cat:'resident', year:1899, era:'Lived at Well Hall House 1899&ndash;1922',
      lat:null, lon:null, addr:'',
      text:'Socialist writer Hubert Bland, a co-founder of the Fabian Society, lived at Well Hall House in Eltham from 1899 to 1922 with his wife, the author Edith Nesbit, best known for The Railway Children and Five Children and It. Their Eltham home became a gathering point for early Fabian intellectuals during a formative period for British socialist thought.' },

    { id:'hughroy-currie', img:'', name:'Hughroy Currie', area:'Catford, Brockley and briefly Bromley', pc:'SE6', cat:'resident', year:null, era:'British Heavyweight Champion 1985&ndash;86',
      lat:null, lon:null, addr:'',
      text:'Boxer who became British Heavyweight Champion in 1985&ndash;86, having lived in Catford, Brockley and briefly Bromley over the course of his career.' },

    { id:'italo-svevo', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/ItaloSvevo.jpg/330px-ItaloSvevo.jpg', name:'Italo Svevo', area:'Charlton', pc:'SE7', cat:'resident', year:1903, era:'Lived in Charlton 1903&ndash;1913',
      lat:null, lon:null, addr:'',
      text:'Italian modernist writer, author of "Zeno\'s Conscience" and a close friend of James Joyce, who made his home in Charlton Village from 1903 to 1913. During this period his family\'s business sold underwater paint to the Royal Navy, used extensively on ships including through both World Wars &mdash; an unlikely commercial footnote to one of European literature\'s more significant novelists.' },

    { id:'jacqui-mcshee', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Pentangle2007_%28cropped%29.jpg/330px-Pentangle2007_%28cropped%29.jpg', name:'Jacqui McShee', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Folk singer and co-founder of the influential 1960s folk-jazz group Pentangle, known for her distinctive vocal style across the band\'s genre-blending catalogue of British folk, jazz and blues influences.' },

    { id:'jade-goody', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Goody.jpg/330px-Goody.jpg', name:'Jade Goody', area:'Bermondsey', pc:'SE16', cat:'resident', year:1981, era:'1981&ndash;2009',
      lat:null, lon:null, addr:'',
      text:'Reality television personality born in Bermondsey in 1981, who rose to fame on Big Brother in 2002 and became one of the most talked-about figures in British tabloid culture, including through her widely covered cancer diagnosis and death in 2009, which prompted a significant national rise in cervical screening uptake.' },

    { id:'jak-airport', img:'', name:'Jak Airport', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Guitarist for the punk band X-Ray Spex and later the new wave band Classix Nouveaux, born and raised in Catford.' },

    { id:'japan-band', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/David_Sylvian_1978.jpg/330px-David_Sylvian_1978.jpg', name:'Japan (band)', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'The 1980s new wave band Japan &mdash; vocalist David Sylvian, bassist Mick Karn, drummer Steve Jansen and keyboardist Richard Barbieri &mdash; all grew up in Catford and attended Catford Boys\' School together before forming one of the more art-school-inflected acts of the British new wave scene, known for albums such as Tin Drum.' },

    { id:'jem-karacan', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Jem_Karacan_cropped.jpg/330px-Jem_Karacan_cropped.jpg', name:'Jem Karacan', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'International footballer born in Catford, who has represented Turkey at senior level after coming up through English football, including a spell at Reading F.C.' },

    { id:'jim-connell', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Jim_Connell_1852-1929_Irish%2C_Socialist_and_Author_of_%27The_Red_Flag%27_lived_here_1915-1929.jpg/330px-Jim_Connell_1852-1929_Irish%2C_Socialist_and_Author_of_%27The_Red_Flag%27_lived_here_1915-1929.jpg', name:'Jim Connell', area:'Honor Oak', pc:'SE23', cat:'resident', year:1889, era:'Wrote "The Red Flag" 1889',
      lat:null, lon:null, addr:'',
      text:'Irish socialist Jim Connell composed "The Red Flag," one of the most famous socialist anthems in history, on a train journey from Charing Cross to Honor Oak in 1889, reportedly inspired by watching a railway guard raise and lower a red signal flag while thinking about that year\'s London Dock Strike. Connell had been born in County Meath, moved to London after losing his job for trying to unionise Dublin dockworkers, and lived in the Honor Oak and Crofton Park area for much of his later life.' },

    { id:'jim-legxacy', img:'', name:'Jim Legxacy', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Rapper, singer and record producer associated with Catford, part of a newer generation of South East London musicians blending UK rap, R&amp;B and alternative influences.' },

    { id:'joe-gomez', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Joe_Gomez_04012026_%281%29.jpg/330px-Joe_Gomez_04012026_%281%29.jpg', name:'Joe Gomez', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Footballer born in Catford, who came through Charlton Athletic\'s youth system before establishing himself as a first-team defender for Liverpool F.C. and earning international caps for England.' },

    { id:'john-boyega', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/John_Boyega_%2854716098702%29.jpg/330px-John_Boyega_%2854716098702%29.jpg', name:'John Boyega', area:'Peckham', pc:'SE15', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Actor best known for playing Finn in the Star Wars sequel trilogy, who grew up in Peckham before training at the South London Theatre and rising to international fame.' },

    { id:'john-evelyn', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/JohnEvelyn1687.jpg/330px-JohnEvelyn1687.jpg', name:'John Evelyn', area:'Deptford', pc:'SE8', cat:'resident', year:1698, era:'Hosted Peter the Great 1698',
      lat:null, lon:null, addr:'',
      text:'Diarist and writer who lived at Sayes Court in Deptford, famous for hosting Tsar Peter the Great of Russia as a guest for about three months in 1698, while the Tsar studied shipbuilding techniques at the Royal Dockyard &mdash; reportedly to the considerable detriment of Evelyn\'s prized gardens.' },

    { id:'john-fletcher', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/John_Fletcher_from_NPG.jpg/330px-John_Fletcher_from_NPG.jpg', name:'John Fletcher', area:'Bankside', pc:'SE1', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Jacobean playwright John Fletcher lived and wrote on Bankside, close to the Globe, in a celebrated writing partnership with Francis Beaumont. Fletcher later succeeded Shakespeare as the King\'s Men\'s principal playwright, and is buried in Southwark Cathedral.' },

    { id:'john-gower', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/John_Gower_world_Vox_Clamantis.jpg/330px-John_Gower_world_Vox_Clamantis.jpg', name:'John Gower', area:'Bankside', pc:'SE1', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Medieval poet and contemporary of Chaucer, John Gower is buried in Southwark Cathedral on Bankside, his elaborately painted tomb one of the finest surviving medieval monuments in London. Gower was a major figure of Middle English poetry, close enough to Chaucer that Chaucer dedicated Troilus and Criseyde to him.' },

    { id:'john-newlands', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/John_Alexander_Reina_Newlands.jpg/330px-John_Alexander_Reina_Newlands.jpg', name:'John Newlands', area:'Elephant &amp; Castle', pc:'SE1', cat:'resident', year:1837, era:'Born 1837',
      lat:null, lon:null, addr:'',
      text:'Chemist born in 1837 in West Square, just behind what is now the Imperial War Museum, who devised an early precursor to the periodic table known as the "Law of Octaves" &mdash; arranging known elements by atomic weight and noting recurring patterns every eighth element. His contribution was under-recognised in his own lifetime but is now seen as an important step towards Dmitri Mendeleev\'s periodic table.' },

    { id:'john-ruskin', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/John_Ruskin_1863.jpg/330px-John_Ruskin_1863.jpg', name:'John Ruskin', area:'Dulwich', pc:'SE21', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Victorian writer, art critic and social thinker John Ruskin was a notable resident of Dulwich, one of the most influential cultural figures of his era, whose writing on art, architecture and society shaped Victorian taste and left a lasting mark on later social reform movements.' },

    { id:'john-shaw-sr', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/John_Shaw%2C_President_of_the_Sheffield_Association.jpg/330px-John_Shaw%2C_President_of_the_Sheffield_Association.jpg', name:'John Shaw Sr.', area:'Bexley', pc:'DA5', cat:'resident', year:1776, era:'1776&ndash;1832',
      lat:null, lon:null, addr:'',
      text:'Celebrated 19th-century architect from the Shaw family of Bexley, who worked on Lamorbey Park and became a well-known figure in Kent and Middlesex architecture, notable as one of the first designers of semi-detached housing in London. He is buried at St Mary the Virgin, Bexley. His son, John Shaw Jr, lived nearby in Crayford for a time.' },

    { id:'john-stuart-mill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/John_Stuart_Mill_by_London_Stereoscopic_Company%2C_c1870.jpg/330px-John_Stuart_Mill_by_London_Stereoscopic_Company%2C_c1870.jpg', name:'John Stuart Mill', area:'Blackheath', pc:'SE3', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Influential 19th-century philosopher and political economist associated with Blackheath, whose writings on liberty, utilitarianism and the subjection of women remain foundational texts in Western political philosophy.' },

    { id:'k2-telephone-kiosk', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/K2_telephone_kiosk_on_Great_George_Street%2C_London.jpg/330px-K2_telephone_kiosk_on_Great_George_Street%2C_London.jpg', name:'K2 telephone kiosk', area:'Elephant &amp; Castle', pc:'SE1', cat:'grand', year:1927, era:'Installed 1927; relocated 2021',
      lat:null, lon:null, addr:'',
      text:'A Grade II listed K2 model telephone box from 1927, designed by Sir Giles Gilbert Scott &mdash; the architect also responsible for Battersea Power Station and the classic red phone box design more broadly. Originally sited on the southern side of New Kent Road, it was carefully moved a few metres and reinstalled at the entrance of Ash Avenue in 2021 as part of the area\'s ongoing redevelopment.' },

    { id:'karl-marx', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png/330px-Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png', name:'Karl Marx', area:'Camberwell', pc:'SE5', cat:'resident', year:1849, era:'Settled in Camberwell 1849',
      lat:null, lon:null, addr:'',
      text:'Karl Marx settled with his family in Camberwell when they first moved to London in 1849, in the early years of an exile that would eventually produce Das Kapital &mdash; a formative, little-known London chapter for one of history\'s most consequential political thinkers.' },

    { id:'kate-bush', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Kate_Bush_Hounds_of_Love_%281985_EMI_publicity_photo%29_02_%28cropped%29.jpg/330px-Kate_Bush_Hounds_of_Love_%281985_EMI_publicity_photo%29_02_%28cropped%29.jpg', name:'Kate Bush', area:'Bexleyheath', pc:'DA6', cat:'resident', year:1958, era:'Born 1958',
      lat:null, lon:null, addr:'',
      text:'World-renowned singer-songwriter, born in Bexleyheath in 1958. Bush went on to become one of Britain\'s most distinctive and influential musical artists, achieving global recognition for hits including "Wuthering Heights" and, decades later, a career-defining resurgence with "Running Up That Hill."' },

    { id:'leslie-dwyer', img:'', name:'Leslie Dwyer', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Actor born in Catford, who built a long career across British film and television through the mid-20th century.' },

    { id:'leslie-howard', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Leslie_Howard_GWTW.jpg/330px-Leslie_Howard_GWTW.jpg', name:'Leslie Howard', area:'Forest Hill', pc:'SE23', cat:'resident', year:1943, era:'Died 1943',
      lat:null, lon:null, addr:'',
      text:'British actor best remembered internationally for playing Ashley Wilkes in Gone with the Wind, who lived in Forest Hill before his acting career took him to Hollywood. Howard was killed in 1943 when the civilian aircraft he was travelling on was shot down during the Second World War.' },

    { id:'lillie-langtry', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Lillie_Langtry_by_Sarony_cph.3b10327.jpg/330px-Lillie_Langtry_by_Sarony_cph.3b10327.jpg', name:'Lillie Langtry', area:'Brockley', pc:'SE4', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Victorian actress and socialite Lillie Langtry, famed for her beauty and her relationship with the future King Edward VII, was a notable resident of Brockley during its heyday as a wealthy Victorian suburb, when Wickham Road and Breakspears Road were home to the owners and managers of nearby Deptford and Bermondsey factories.' },

    { id:'louis-theroux', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Louis_Theroux_crop.jpg/330px-Louis_Theroux_crop.jpg', name:'Louis Theroux', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'British-American journalist, documentary-maker and broadcaster, known for his immersive interview-led documentaries such as Weird Weekends and When Louis Met.... One of the more prominent contemporary media figures associated with Catford.' },

    { id:'lucy-mangan', img:'', name:'Lucy Mangan', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Columnist for The Guardian, who lived in Catford for more than thirty years and has written affectionately &mdash; if not uncritically &mdash; about the area, including a well-known 2008 piece for the paper titled "Catford: a tribute (yes, really)."' },

    { id:'manor-house-gardens', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Manor_House_Gardens%2C_Lee_%28geograph_2358229%29.jpg/330px-Manor_House_Gardens%2C_Lee_%28geograph_2358229%29.jpg', name:'Manor House Gardens', area:'Lee', pc:'SE12', cat:'green', year:1773, era:'Laid out 1773; restored 2000',
      lat:null, lon:null, addr:'',
      text:'A public park and gardens originally laid out in 1773 as the private grounds of the Manor House, purchased by Sir Francis Baring, founder of Barings Bank, in 1792. The gardens suffered significant damage in the Great Storm of 1987, prompting local campaigns for funding that saw the house and gardens fully restored by 2000; it now hosts a monthly farmers\' market alongside its ornamental pond and walled flower garden.' },

    { id:'manor-place-baths', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Manor_place_baths.jpg/330px-Manor_place_baths.jpg', name:'Manor Place Baths', area:'Walworth', pc:'SE17', cat:'grand', year:null, era:'Grade II listed; reopened as Buddhist centre 2007',
      lat:null, lon:null, addr:'',
      text:'A former Victorian wash house on Manor Place, now Grade II listed. It was renovated and reopened in 2007 as a Tibetan Buddhist centre by Kagyu Samye Dzong, before later becoming home to an indoor skatepark run by Nike in collaboration with Palace Skateboards &mdash; an unusual double life for one small building.' },

    { id:'margaret-thatcher', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Margaret_Thatcher_stock_portrait_%28cropped%29.jpg/330px-Margaret_Thatcher_stock_portrait_%28cropped%29.jpg', name:'Margaret Thatcher', area:'Dulwich', pc:'SE21', cat:'resident', year:1979, era:'PM 1979&ndash;1990',
      lat:null, lon:null, addr:'',
      text:'Margaret Thatcher, Prime Minister of the United Kingdom from 1979 to 1990 and the first woman to hold the office, was a notable resident of Dulwich, giving this quiet, leafy corner of South East London an unexpected link to one of the most consequential political careers in modern British history.' },

    { id:'mary-kingsley', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Mary_Kingsley_-_Project_Gutenberg_eText_13103.jpg/330px-Mary_Kingsley_-_Project_Gutenberg_eText_13103.jpg', name:'Mary Kingsley', area:'Bexleyheath', pc:'DA6', cat:'resident', year:1862, era:'1862&ndash;1900',
      lat:null, lon:null, addr:'',
      text:'Pioneering explorer, ethnographer and scientific writer, who as a young woman lived with her mother and brother at a house on Main Road, Bexleyheath (sources differ on whether it was called Southwood House or Southwark House). Kingsley went on to travel extensively in West Africa in the 1890s, publishing accounts that challenged contemporary European attitudes towards African societies and culture.' },

    { id:'melita-norwood', img:'', name:'Melita Norwood', area:'Bexleyheath', pc:'DA6', cat:'resident', year:1912, era:'1912&ndash;2005; exposed 1999',
      lat:null, lon:null, addr:'',
      text:'A seemingly ordinary Bexleyheath resident who was in fact a Soviet intelligence agent for decades during the Cold War, passing British nuclear secrets to Moscow while working as a clerical assistant. Her identity as a spy was only publicly exposed in 1999, when she was in her mid-eighties, making headlines as one of the most unlikely-looking Cold War spies ever unmasked.' },

    { id:'michael-caine', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Michael_Caine_-_Viennale_2012_g_%28cropped%29.jpg/330px-Michael_Caine_-_Viennale_2012_g_%28cropped%29.jpg', name:'Michael Caine', area:'Elephant &amp; Castle', pc:'SE1', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Acclaimed British actor, born and raised locally in difficult circumstances before going on to an Oscar-winning career spanning more than six decades. He later titled his 2010 autobiography "The Elephant to Hollywood" in direct reference to his roots in the area.' },

    { id:'michael-faraday', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Michael_Faraday_sitting_crop.jpg/330px-Michael_Faraday_sitting_crop.jpg', name:'Michael Faraday', area:'Elephant &amp; Castle', pc:'SE1', cat:'resident', year:1791, era:'Born 1791',
      lat:null, lon:null, addr:'',
      text:'Pioneering scientist born nearby in 1791, whose work on electromagnetism and electrochemistry underpins much of modern physics and engineering. He is honoured locally by the Michael Faraday Memorial, a stainless steel box in Elephant Square that also houses an electrical substation for the Northern line.' },

    { id:'milford-towers', img:'', name:'Milford Towers', area:'Catford', pc:'SE6', cat:'grand', year:1972, era:'Developed early 1970s',
      lat:null, lon:null, addr:'Near Thomas Lane',
      text:'A Brutalist housing estate developed in the early 1970s by Owen Luder, sometimes nicknamed the "Barbican of the South" for its raw concrete ambition. Lewisham Council proposed demolishing it in 2015 due to disrepair, but it was refurbished in 2018 instead, buying it more time. Long-term redevelopment of the estate, alongside the wider Catford Shopping Centre, remains part of the council\'s ongoing Catford regeneration plans.' },

    { id:'mountsfield-park', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mountsfield_Park_1914.png/330px-Mountsfield_Park_1914.png', name:'Mountsfield Park', area:'Catford', pc:'SE6', cat:'green', year:null, era:'Charlton Athletic played here in the 1920s',
      lat:null, lon:null, addr:'Off Stainton Road',
      text:'A large public park with sports facilities and open green space, hosting Lewisham Council\'s annual People\'s Day event every July. In the 1920s, Charlton Athletic F.C. played their home matches here at The Mount stadium before moving on to become one of South London\'s best-known football clubs &mdash; a little-known chapter in the club\'s early history that most fans today wouldn\'t associate with Catford.' },

    { id:'new-cross-fire-station', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/New_Cross_Fire_Station_-_geograph.org.uk_-_314484.jpg/330px-New_Cross_Fire_Station_-_geograph.org.uk_-_314484.jpg', name:'New Cross Fire Station', area:'New Cross', pc:'SE14', cat:'grand', year:1893, era:'Built 1893&ndash;94',
      lat:null, lon:null, addr:'',
      text:'A Grade II listed fire station built in 1893&ndash;94 to designs by architect Robert Pearsall. George Arthur Roberts, a pioneering Black firefighter and founder of the fire service\'s wartime discussion and education groups, was stationed here during the Second World War.' },

    { id:'nunhead-f-c', img:'', name:'Nunhead F.C.', area:'Nunhead', pc:'SE15', cat:'works', year:null, era:'Active 1888&ndash;1949',
      lat:null, lon:null, addr:'',
      text:'A non-league football club that played from 1888 to 1949, enjoying its most successful period in the 1920s and 30s with a London Senior Cup win in 1923 and back-to-back Isthmian League titles in 1928&ndash;29 and 1929&ndash;30. In the 1926&ndash;27 FA Cup, the club set a record for the highest-margin win by a non-league side in the competition\'s history, beating Kingstonian 9&ndash;0 &mdash; a record it then lost on the receiving end five years later. Future England and Arsenal cricketer-footballer Denis Compton played for the club in the mid-1930s before its wartime closure.' },

    { id:'olaudah-equiano', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Olaudah_Equiano_-_Project_Gutenberg_eText_15399_%28cropped%29.png/330px-Olaudah_Equiano_-_Project_Gutenberg_eText_15399_%28cropped%29.png', name:'Olaudah Equiano', area:'Deptford', pc:'SE8', cat:'resident', year:1760, era:'Sold in Deptford c.1760',
      lat:null, lon:null, addr:'',
      text:'Enslaved as a child and later sold between ship captains in Deptford around 1760, Equiano went on to buy his own freedom and become one of the most influential Black abolitionist voices in Britain, whose 1789 autobiography helped galvanise the movement that eventually ended the British slave trade.' },

    { id:'old-lewisham-town-hall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Lewisham_Town_Hall.JPG/330px-Lewisham_Town_Hall.JPG', name:'Old Lewisham Town Hall', area:'Catford', pc:'SE6', cat:'grand', year:null, era:'Built 1875; Goldsmiths campus from 2027',
      lat:null, lon:null, addr:'Catford, adjoining Broadway Theatre',
      text:'The Victorian Town Hall of 1875 was replaced by a new Civic Suite in 1968, shortly after the merger of the metropolitan boroughs of Lewisham and Deptford. The older building has stood largely disused in recent years while the council\'s functions moved to Laurence House nearby. In January 2026 it was announced that Goldsmiths, University of London would relocate its Fine Art and Design department into the old Town Hall, with a new campus due to open from 2027 &mdash; a striking new chapter for one of Catford\'s oldest civic buildings.' },

    { id:'prince-lee-boo', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Prince_Lee_Boo.jpg/330px-Prince_Lee_Boo.jpg', name:'Prince Lee Boo', area:'Rotherhithe', pc:'SE16', cat:'resident', year:1784, era:'Died in London 1784',
      lat:null, lon:null, addr:'',
      text:'A prince of the Pelew (Palau) Islands in the Pacific, Lee Boo travelled to London in 1784 with Captain Henry Wilson of the East Indiaman Antelope, whose shipwrecked crew Lee Boo\'s father had sheltered. He died of smallpox soon after arriving and was buried at St Mary\'s Church, Rotherhithe, where the East India Company erected a monument still standing today, inscribed: "Stop, reader, stop, let Nature shed a tear / A prince of mine, Lee Boo, lies buried here."' },

    { id:'ray-blk', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Ray_BLK_2_%E2%80%93_splash%21_Festival_20_%282017%29.jpg/330px-Ray_BLK_2_%E2%80%93_splash%21_Festival_20_%282017%29.jpg', name:'Ray BLK', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'British singer and songwriter associated with Catford, known for blending R&amp;B, soul and UK rap influences; winner of the BBC Sound of 2017 poll, recognising her as one of the year\'s most promising new artists.' },

    { id:'rio-ferdinand', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Rio_Ferdinand%2C_2004.jpg/330px-Rio_Ferdinand%2C_2004.jpg', name:'Rio Ferdinand', area:'Peckham', pc:'SE15', cat:'resident', year:1978, era:'Born 1978',
      lat:null, lon:null, addr:'',
      text:'Former England international footballer and one of the country\'s most decorated defenders, born in Peckham in 1978. Ferdinand went on to a long career with West Ham, Leeds United and Manchester United before becoming a prominent television pundit.' },

    { id:'river-cray', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_River_Cray_at_Bexley_-_geograph.org.uk_-_1409947.jpg/330px-The_River_Cray_at_Bexley_-_geograph.org.uk_-_1409947.jpg', name:'River Cray', area:'Bexley', pc:'DA5', cat:'maritime', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'The river running past Hall Place on its way through Bexley towards Crayford, historically central to the development of the village. The council-sponsored Cray River Way walking route follows the river\'s course from Crayford towards Foots Cray, and the river also forms part of the Mayor of London\'s London LOOP walk shortly after it begins at Erith.' },

    { id:'river-ravensbourne-at-catford-bridge', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/The_River_Ravensbourne_south_of_Catford_Road%2C_SE6_%282%29_-_geograph.org.uk_-_2253243.jpg/330px-The_River_Ravensbourne_south_of_Catford_Road%2C_SE6_%282%29_-_geograph.org.uk_-_2253243.jpg', name:'River Ravensbourne at Catford Bridge', area:'Catford', pc:'SE6', cat:'maritime', year:null, era:'Crossing named in Anglo-Saxon times; bridge and station added 1850s',
      lat:null, lon:null, addr:'Catford Bridge',
      text:'The likely origin of the name "Catford" itself: speculation holds that this was where cattle once forded the River Ravensbourne in Anglo-Saxon times, or alternatively where wild cats used the crossing &mdash; the true origin was lost to history long ago. A bridge was later built over the crossing, and in the 1850s a railway station named Catford Bridge opened alongside it, sparking development that spread the name "Catford" out over what had previously been the separate village of Rushey (or Rush) Green.' },

    { id:'robert-browning', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Robert_Browning_by_Herbert_Rose_Barraud%2C_circa_1888.jpg/330px-Robert_Browning_by_Herbert_Rose_Barraud%2C_circa_1888.jpg', name:'Robert Browning', area:'Walworth', pc:'SE17', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Victorian poet and playwright associated with Walworth, one of several literary and artistic figures with roots in the area alongside painter Samuel Palmer.' },

    { id:'robert-stanford-tuck', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Robert_Stanford_Tuck%2C_Royal_Air_Force_%28RAF%29_fighter_pilot_in_a_Hawker_Hurricane_of_No._257_Squadron_RAF%2C_circa_1941.jpg/330px-Robert_Stanford_Tuck%2C_Royal_Air_Force_%28RAF%29_fighter_pilot_in_a_Hawker_Hurricane_of_No._257_Squadron_RAF%2C_circa_1941.jpg', name:'Robert Stanford Tuck', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Second World War RAF fighter ace credited with 27 confirmed victories during the Battle of Britain and subsequent campaigns. He survived being shot down and captured by the Germans, later escaping from custody near the end of the war &mdash; one of the best-known fighter pilots to come from South East London.' },

    { id:'robin-trower', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/RobinTrower.jpg/330px-RobinTrower.jpg', name:'Robin Trower', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Guitarist best known for his work with Procol Harum in the late 1960s and early 1970s, before building an extensive solo career as a blues-rock guitarist with a string of well-regarded albums from the mid-1970s onward.' },

    { id:'rosa-may-billinghurst', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Rosa_May_Billinghurst_%2839633766971%29_%28cropped%29.jpg/330px-Rosa_May_Billinghurst_%2839633766971%29_%28cropped%29.jpg', name:'Rosa May Billinghurst', area:'Lewisham', pc:'SE13', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Suffragette and disability rights campaigner associated with Lewisham, notable both for her militant activism in the fight for women\'s votes and for being one of the few prominent disabled suffragettes of the movement, campaigning from a wheelchair-adapted tricycle.' },

    { id:'rushey-green-village-water-pump', img:'', name:'Rushey Green village water pump', area:'Catford', pc:'SE6', cat:'grand', year:null, era:'1850s',
      lat:null, lon:null, addr:'Rushey Green',
      text:'A surviving hand-operated water pump dating from the 1850s, once used by the original village of Rushey Green (also spelled Rush Green) before the area grew and took on the name "Catford" following the opening of Catford Bridge railway station nearby. It stands today as one of the very few physical traces left of the pre-Victorian settlement that predates the town centre now built around it.' },

    { id:'samuel-coleridge-taylor', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Samuel_Coleridge-Taylor.jpg/330px-Samuel_Coleridge-Taylor.jpg', name:'Samuel Coleridge-Taylor', area:'Crystal Palace', pc:'SE19', cat:'resident', year:1912, era:'Died 1912',
      lat:null, lon:null, addr:'',
      text:'Composer Samuel Coleridge-Taylor, celebrated for blending African and European classical musical traditions, lived in the South Norwood area near Crystal Palace. He became one of the most acclaimed British composers of his generation before his early death in 1912, and is commemorated locally with a road named in his honour.' },

    { id:'samuel-johnson', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Samuel_Johnson_by_Joshua_Reynolds.jpg/330px-Samuel_Johnson_by_Joshua_Reynolds.jpg', name:'Samuel Johnson', area:'Greenwich', pc:'SE10', cat:'resident', year:1736, era:'Lived in Greenwich from 1736',
      lat:null, lon:null, addr:'',
      text:'Compiler of the first great English dictionary, who lived on Greenwich Church Street when he first arrived in London in 1736, long before he began the eighteen-year project that produced his landmark Dictionary of the English Language in 1755.' },

    { id:'samuel-palmer', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Samuel_Palmer_-_Self-Portrait_-_WGA16951.jpg/330px-Samuel_Palmer_-_Self-Portrait_-_WGA16951.jpg', name:'Samuel Palmer', area:'Walworth', pc:'SE17', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Romantic-era landscape painter and printmaker, born in Walworth, known for visionary pastoral works produced later in his career alongside his time among the "Ancients" group of artists influenced by William Blake.' },

    { id:'sandhurst-road-school-wwii-bombing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sandhurst_Road_School_%2823935092374%29.jpg/330px-Sandhurst_Road_School_%2823935092374%29.jpg', name:'Sandhurst Road School (WWII bombing)', area:'Catford', pc:'SE6', cat:'memory', year:1943, era:'20 January 1943',
      lat:null, lon:null, addr:'Minard Road',
      text:'On 20 January 1943, a German Focke-Wulf fighter-bomber dropped a single 500kg bomb on Sandhurst Road School at lunchtime, destroying much of the building and killing 38 children and 6 teachers &mdash; one of the deadliest single attacks on a British school during the Second World War. Some accounts report the pilot looped low over the playground and waved at children moments before releasing the bomb, which struck directly over the school dining room. Many victims were buried for hours under the rubble; 31 children and one teacher are buried together in a civilian war dead plot at Hither Green Cemetery, following a funeral conducted by the Bishop of Southwark and attended by over 7,000 mourners. The school, now Sandhurst Primary School, still holds a stained-glass memorial window and a small memorial garden marking the date.' },

    { id:'sheila-hancock', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Sheila_Hancock_-_GylesDamesPalladium050323_%2874_of_74%29_%2852728634758%29.jpg/330px-Sheila_Hancock_-_GylesDamesPalladium050323_%2874_of_74%29_%2852728634758%29.jpg', name:'Sheila Hancock', area:'Bexleyheath', pc:'DA6', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Acclaimed stage and screen actress who lived on Latham Road in Bexleyheath. Hancock built a long and celebrated career across British theatre, film and television spanning more than six decades.' },

    { id:'sir-arthur-conan-doyle', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Arthur_Conan_Doyle_by_Walter_Benington%2C_1914.png/330px-Arthur_Conan_Doyle_by_Walter_Benington%2C_1914.png', name:'Sir Arthur Conan Doyle', area:'Crystal Palace', pc:'SE19', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Creator of Sherlock Holmes, Sir Arthur Conan Doyle lived in the South Norwood area on the edge of Crystal Palace, a period during which he continued writing the detective stories that would make him one of the most widely read authors in the English language.' },

    { id:'sir-arthur-eddington', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Arthur_Stanley_Eddington.jpg/330px-Arthur_Stanley_Eddington.jpg', name:'Sir Arthur Eddington', area:'Blackheath', pc:'SE3', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Mathematician and astrophysicist who lived in Blackheath in the early 20th century. Eddington\'s 1919 expedition to observe a solar eclipse provided some of the first experimental confirmation of Einstein\'s general theory of relativity, making him one of the most significant scientific figures of his generation.' },

    { id:'sir-francis-baring', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sir_Francis_Baring%2C_1st_Baronet.jpg/330px-Sir_Francis_Baring%2C_1st_Baronet.jpg', name:'Sir Francis Baring', area:'Lee', pc:'SE12', cat:'resident', year:1792, era:'Purchased Manor House 1792',
      lat:null, lon:null, addr:'',
      text:'Founder of Barings Bank, one of Britain\'s most significant merchant banks. Baring purchased Lee\'s Manor House in 1792 and developed the surrounding area, shaping much of what became the Lee and Lee Green of today.' },

    { id:'sir-george-airy', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/George_Biddell_Airy_1891.jpg/330px-George_Biddell_Airy_1891.jpg', name:'Sir George Airy', area:'Greenwich', pc:'SE10', cat:'resident', year:1801, era:'1801&ndash;1892',
      lat:null, lon:null, addr:'',
      text:'Astronomer Royal from 1835 to 1881, who lived at the White House on Crooms Hill. Airy modernised the Royal Observatory\'s operations and is credited with helping establish the Greenwich meridian as the world standard for longitude and timekeeping.' },

    { id:'sir-george-grove', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/George-grove.jpg/330px-George-grove.jpg', name:'Sir George Grove', area:'Sydenham', pc:'SE26', cat:'resident', year:1900, era:'Lived in Sydenham 1852&ndash;1860; died 1900',
      lat:null, lon:null, addr:'',
      text:'Engineer and musicologist Sir George Grove lived in Sydenham between 1852 and 1860, during which time he worked as secretary of the Society of Arts helping organise the Great Exhibition. He is much better remembered today as the founding editor of Grove\'s Dictionary of Music and Musicians, still a standard musical reference work, and as the first director of the Royal College of Music. He died at his cottage in Lower Sydenham in 1900 and is buried in Brockley and Ladywell Cemetery.' },

    { id:'sir-james-clark-ross', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/James_Clark_Ross.jpg/330px-James_Clark_Ross.jpg', name:'Sir James Clark Ross', area:'Blackheath', pc:'SE3', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Polar explorer who lived in Blackheath, best known for discovering the Ross Sea and the Ross Ice Shelf in Antarctica during his 1839&ndash;1843 expedition, and for locating the North Magnetic Pole in the Canadian Arctic in 1831. One of the most celebrated explorers of his era.' },

    { id:'sir-james-thornhill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/James_Thornhill_self_portrait.jpg/330px-James_Thornhill_self_portrait.jpg', name:'Sir James Thornhill', area:'Greenwich', pc:'SE10', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Baroque painter renowned for his ceiling and wall paintings, including the Painted Hall at the Old Royal Naval College. He was said to have lived at Park Hall on Crooms Hill, a house originally designed for the architect John James, who never actually occupied it himself.' },

    { id:'site-of-catford-stadium', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Current_site_of_The_Mount_stadium_in_Mountsfield_Park%2C_Catford%2C_2022.jpg/330px-Current_site_of_The_Mount_stadium_in_Mountsfield_Park%2C_Catford%2C_2022.jpg', name:'Site of Catford Stadium', area:'Catford', pc:'SE6', cat:'memory', year:1932, era:'Operated 1932&ndash;2003; demolished after 2005 fire',
      lat:null, lon:null, addr:'Adenmore Road',
      text:'Home to greyhound racing from 1932 until its closure in 2003, hosting competitions including the Gold Collar and Greenwich Cup for over 70 years, as well as boxing and other sporting events, between the southern railway bridges near Catford Bridge station. The abandoned stadium was destroyed by fire in 2005 and later demolished to make way for new housing, ending one of South East London\'s longest-running sporting venues and a once-central part of Catford\'s social life.' },

    { id:'spencer-perceval', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Spencer_Perceval_by_George_Francis_Joseph.jpg/330px-Spencer_Perceval_by_George_Francis_Joseph.jpg', name:'Spencer Perceval', area:'Charlton', pc:'SE7', cat:'resident', year:1812, era:'Assassinated 1812',
      lat:null, lon:null, addr:'',
      text:'The only British Prime Minister ever to be assassinated, shot in the lobby of the House of Commons in 1812. Perceval is buried at St Luke\'s Church, Charlton, alongside civil servant Edward Drummond, giving this small parish church an unusually direct link to a defining moment in British political history.' },

    { id:'spike-milligan', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Spike_Milligan_in_the_snow_-_geograph.org.uk_-_3305243.jpg/330px-Spike_Milligan_in_the_snow_-_geograph.org.uk_-_3305243.jpg', name:'Spike Milligan', area:'Catford', pc:'SE6', cat:'resident', year:null, era:'1918&ndash;2002',
      lat:null, lon:null, addr:'',
      text:'Comedian and writer, co-creator of The Goon Show, who attended Catford\'s Brownhill Boys\' School and wrote about the area in his books and sketches, helping cement Catford\'s slightly surreal reputation in British comedy. Despite the strong local association, Milligan is actually recorded as having lived in neighbouring Honor Oak rather than Catford itself &mdash; a distinction local folklore tends to blur.' },

    { id:'st-laurence-s-church', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/St_Laurence_Church%2C_Bromley_Road%2C_Catford_%E2%80%93_detail_%28geograph_3941134%29.jpg/330px-St_Laurence_Church%2C_Bromley_Road%2C_Catford_%E2%80%93_detail_%28geograph_3941134%29.jpg', name:'St Laurence\'s Church', area:'Catford', pc:'SE6', cat:'grand', year:1968, era:'Built 1968, replacing an 1887 church',
      lat:null, lon:null, addr:'Bromley Road',
      text:'A Brutalist parish church built in 1968 by architect Ralph Covell, now Grade II listed. It replaced the original St Laurence\'s Church of 1887, designed by architect Hugh Roumieu Gough, which stood roughly 200 metres away and was demolished in 1969 to make way for Laurence House &mdash; the council building that now houses the offices of the Mayor of Lewisham and the borough\'s Young Mayors.' },

    { id:'st-margaret-s-church-lee', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/St_Margaret%27s_Church%2C_Lee_-_geograph.org.uk_-_204689.jpg/330px-St_Margaret%27s_Church%2C_Lee_-_geograph.org.uk_-_204689.jpg', name:'St Margaret\'s Church, Lee', area:'Lee', pc:'SE12', cat:'grand', year:1839, era:'Rebuilt 1839&ndash;1841',
      lat:null, lon:null, addr:'',
      text:'The parish church of Lee, rebuilt between 1839 and 1841 to a design by architect John Brown. Its churchyard is the burial place of three Astronomers Royal &mdash; Edmond Halley (of Halley\'s Comet fame), Nathaniel Bliss and John Pond &mdash; an unusually concentrated cluster of scientific history for one small South East London churchyard.' },

    { id:'st-mary-the-virgin-church-bexley', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/St_Mary_the_Virgin_Church_Bexley_-_geograph.org.uk_-_2027777.jpg/330px-St_Mary_the_Virgin_Church_Bexley_-_geograph.org.uk_-_2027777.jpg', name:'St Mary the Virgin Church, Bexley', area:'Bexley', pc:'DA5', cat:'grand', year:null, era:'Medieval origins; Victorian refurbishment',
      lat:null, lon:null, addr:'',
      text:'Bexley\'s principal landmark, an ancient parish church whose most distinctive feature is an unusual spire resembling an octagonal cone balanced on a truncated pyramid. Originally built in the Middle Ages, its monastic-style interior survived largely unaltered from the Reformation until the 18th century, before a Victorian-era refurbishment. The churchyard is the burial place of the German-born scientist Henry Oldenburg, first Secretary of the Royal Society, who died in 1677.' },

    { id:'st-peter-s-church-walworth', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/St._Peter%27s_Church%2C_Walworth_-_geograph.org.uk_-_5141454.jpg/330px-St._Peter%27s_Church%2C_Walworth_-_geograph.org.uk_-_5141454.jpg', name:'St Peter\'s Church, Walworth', area:'Walworth', pc:'SE17', cat:'grand', year:1825, era:'Built c.1825',
      lat:null, lon:null, addr:'',
      text:'A neo-classical church built around 1825 to a design by the eminent architect Sir John Soane, reflecting the wealth of the middle-class merchants living in the area at the time who could afford an architect of such prominence. It remains one of Walworth\'s most architecturally significant buildings.' },

    { id:'sydenham-wells', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Sydenham_Wells_Park.jpg/330px-Sydenham_Wells_Park.jpg', name:'Sydenham Wells', area:'Sydenham', pc:'SE26', cat:'maritime', year:1760, era:'Discovered 17th century; peak popularity c.1760',
      lat:null, lon:null, addr:'',
      text:'Natural mineral springs discovered in Sydenham in the 17th century drew fashionable visitors throughout the 18th century, with a visit from King George III around 1760 marking the peak of their popularity. Some visitors blamed hangovers on the water itself, though contemporaries suspected the brandy sold alongside it at local inns was the likelier culprit. The wells declined through the 19th century and were eventually filled in, but they gave the area Sydenham Wells Park, still one of the largest green spaces within the postcode.' },

    { id:'the-2011-peckham-riots', img:'', name:'The 2011 Peckham riots', area:'Peckham', pc:'SE15', cat:'memory', year:2011, era:'8 August 2011',
      lat:null, lon:null, addr:'',
      text:'In August 2011, Peckham was one of the London districts drawn into the wider wave of England riots that followed the police killing of Mark Duggan in Tottenham. On 8 August, a crowd of three to four hundred people looted shops along Rye Lane and Peckham High Street, a bus was set alight on Southampton Way, and a local restaurant, Regen\'s, was destroyed by fire &mdash; a night that became a defining, painful part of the area\'s recent history and fed into a decade of subsequent debate about policing, race and regeneration in Peckham.' },

    { id:'the-bankside-beargarden', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/The_Bear_Garden%2C_Bankside%2C_London.png/330px-The_Bear_Garden%2C_Bankside%2C_London.png', name:'The Bankside Beargarden', area:'Bankside', pc:'SE1', cat:'memory', year:1583, era:'16th&ndash;17th centuries; gallery collapse 1583; baiting banned 1835',
      lat:null, lon:null, addr:'',
      text:'For centuries Bankside sat just outside the City of London\'s legal control, making it the capital\'s chief haunt for entertainments the City banned: bear- and bull-baiting, brothels and unlicensed theatre. The Beargarden, a round structure resembling the nearby playhouses, hosted these blood sports from the Elizabethan era into the Restoration &mdash; Samuel Pepys visited in 1666 and called it "a rude and nasty pleasure" &mdash; and the practice wasn\'t outlawed until 1835. In 1583, the gallery of the baiting arena in Paris Garden collapsed on a Sunday, killing several spectators and injuring many more, an event Puritan commentators seized on as divine judgement for Sabbath-breaking.' },

    { id:'the-catford-cat', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Catford_Centre%2C_SE6_-_geograph.org.uk_-_2430147.jpg/330px-Catford_Centre%2C_SE6_-_geograph.org.uk_-_2430147.jpg', name:'The Catford Cat', area:'Catford', pc:'SE6', cat:'art', year:1974, era:'Erected 1974',
      lat:null, lon:null, addr:'Catford Centre, Rushey Green',
      text:'A giant fibreglass sculpture of a black cat perched above the entrance to the Catford Centre shopping mall, one paw resting on the "F" of "Catford" as if beckoning shoppers inside. Designed by Brutalist architects Owen Luder and Rodney Gordon &mdash; the same pair behind Eros House and Milford Towers nearby &mdash; as part of the Centre\'s 1974 development. It has become Catford\'s single most recognisable landmark, surviving a serious threat of removal during a 2017 redevelopment scheme after a strong local campaign to save it. A separate housing project nearby, The Queen of Catford, riffs on the cat theme with over 27,000 small cat faces of its own.' },

    { id:'the-charlton-horn-fair', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Skimmington-Triumph%2C_Or_the_Humours_of_Horn_Fair_%28BM_Y%2C1.90%29.jpg/330px-Skimmington-Triumph%2C_Or_the_Humours_of_Horn_Fair_%28BM_Y%2C1.90%29.jpg', name:'The Charlton Horn Fair', area:'Charlton', pc:'SE7', cat:'memory', year:null, era:'Held annually from at least the 17th century; discontinued 1872, revived 1973',
      lat:null, lon:null, addr:'',
      text:'An unruly annual fair held every 18 October at Charlton from at least the 17th century, supposedly founded after a legend involving King John, a miller\'s wife, and an enraged husband who was granted land on condition he process annually to its boundary wearing a pair of buck\'s horns. Revellers travelling from Rotherhithe would disembark at Cuckold\'s Point before parading to Charlton; by the 19th century the fair had a reputation for such debauchery and lawlessness that an 1872 newspaper blamed it for "a week of burglary in the parish" and it was shut down. A tamer, revived version has been held in the grounds of Charlton House since 1973.' },

    { id:'the-crystal-palace-fire', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Crystal_Palace_fire_1936.jpg/330px-Crystal_Palace_fire_1936.jpg', name:'The Crystal Palace fire', area:'Crystal Palace', pc:'SE19', cat:'memory', year:1936, era:'30 November 1936',
      lat:null, lon:null, addr:'',
      text:'On the night of 30 November 1936, the Crystal Palace &mdash; the vast glass-and-iron exhibition hall relocated to Sydenham after London\'s 1851 Great Exhibition &mdash; burned to the ground in a fire so large it was reportedly visible from ten counties away and spotted by airline pilots crossing the English Channel. General manager Sir Henry Buckland was walking the grounds with his young daughter, Crystal, when he spotted the blaze; within half an hour the entire 25-acre structure had caught fire. The disaster effectively ended the building\'s century-defining role, leaving only fragments &mdash; sphinxes, steps and terraces &mdash; in the park that still carries its name.' },

    { id:'the-eltham-well-hall-rail-crash', img:'', name:'The Eltham Well Hall rail crash', area:'Eltham', pc:'SE9', cat:'memory', year:1972, era:'11 June 1972',
      lat:null, lon:null, addr:'',
      text:'On 11 June 1972, a passenger train derailed at speed on a sharp curve near Eltham Well Hall station after its driver, who was found to be drunk, failed to slow down in time. The driver and five passengers were killed and 126 people were injured. The abandoned Eltham Well Hall station site, now beneath the Rochester Way Relief Road, retains no visible trace of the crash, but the current Eltham station\'s railway code (ELW) still nods to the old station\'s name.' },

    { id:'the-forty-elephants', img:'', name:'The Forty Elephants', area:'Elephant &amp; Castle', pc:'SE1', cat:'memory', year:null, era:'Active 18th&ndash;20th centuries',
      lat:null, lon:null, addr:'',
      text:'An all-female shoplifting gang, also known as the Forty Thieves, active from the 18th through the 20th centuries and operating out of the Elephant and Castle, allied with the local Elephant and Castle Mob led by the McDonald brothers. Notable members included Alice Diamond, one of the gang\'s leaders in the first half of the 20th century, and Shirley Pitts, who was "educated" into shoplifting by the group &mdash; a striking piece of the area\'s criminal history distinct from its better-known male gangs.' },

    { id:'the-lewisham-rail-crash', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/St_Johns_Lewisham_Rail_Crash_-_Geograph-2042851.jpg/330px-St_Johns_Lewisham_Rail_Crash_-_Geograph-2042851.jpg', name:'The Lewisham rail crash', area:'Lewisham', pc:'SE13', cat:'memory', year:1957, era:'4 December 1957',
      lat:null, lon:null, addr:'',
      text:'On the evening of 4 December 1957, a steam train travelling to Ramsgate crashed in dense fog into an electric train that had stopped at a signal beneath a railway bridge near Lewisham. The impact destroyed a carriage and brought the bridge down onto the wreckage, killing 90 people and injuring 173 &mdash; one of the deadliest rail disasters in British history. The line was closed for over a week and the bridge itself took a further month to rebuild.' },

    { id:'the-murder-of-maxwell-confait', img:'', name:'The Murder of Maxwell Confait', area:'Catford', pc:'SE6', cat:'memory', year:1972, era:'1972 killing; convictions quashed 1975; led to PACE 1984',
      lat:null, lon:null, addr:'Doggett Road area',
      text:'The 1972 killing of Maxwell Confait in Catford led to the wrongful conviction of three local teenagers &mdash; Colin Lattimore, Ronald Leighton and Ahmet Salih &mdash; based on confessions later shown to be unreliable, obtained under questionable police interview conditions. Their convictions were quashed in 1975 after a public outcry, and the resulting inquiry became one of the most influential miscarriage-of-justice cases in English legal history. Its findings fed directly into the safeguards on police interviews, evidence handling and the right to legal advice later enshrined in the Police and Criminal Evidence Act 1984 (PACE), a law that still governs UK policing today.' },

    { id:'the-murder-of-stephen-lawrence', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Floral_Tributes_to_Stephen_Lawrence_in_Eltham_in_2023_%2805%29.jpg/330px-Floral_Tributes_to_Stephen_Lawrence_in_Eltham_in_2023_%2805%29.jpg', name:'The murder of Stephen Lawrence', area:'Eltham', pc:'SE9', cat:'memory', year:1993, era:'22 April 1993; convictions 2012',
      lat:null, lon:null, addr:'',
      text:'On the evening of 22 April 1993, 18-year-old Stephen Lawrence was fatally stabbed in an unprovoked, racially motivated attack while waiting for a bus with his friend Duwayne Brooks on Well Hall Road. The Metropolitan Police\'s badly mishandled investigation, and the collapse of an early prosecution, led Stephen\'s parents to fund a private case that also failed in 1996. A 1998 public inquiry led by Sir William Macpherson concluded the police force had been institutionally racist, a finding that reshaped British policing, race relations law and the rules on double jeopardy; two of Lawrence\'s killers were finally convicted of murder in January 2012, almost nineteen years after his death.' },

    { id:'the-new-cross-house-fire', img:'', name:'The New Cross house fire', area:'New Cross', pc:'SE14', cat:'memory', year:1981, era:'18 January 1981',
      lat:null, lon:null, addr:'',
      text:'In the early hours of 18 January 1981, a fire broke out during a birthday party at a house on New Cross Road, killing 13 young Black people aged between 14 and 22; a fourteenth victim took his own life two years later. No one was ever charged, and both a 1981 and a 2004 inquest returned open verdicts. The tragedy, and the perceived indifference of the police and press response, led directly to the Black People\'s Day of Action on 2 March 1981, when around 20,000 people marched from Fordham Park to Hyde Park behind placards reading "13 Dead, Nothing Said" &mdash; a pivotal moment in the history of Black British political organising.' },

    { id:'the-old-new-tiger-s-head', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Lee%2C_Old_Tiger%27s_Head_and_old_New_Tiger%27s_Head_-_geograph.org.uk_-_491150.jpg/330px-Lee%2C_Old_Tiger%27s_Head_and_old_New_Tiger%27s_Head_-_geograph.org.uk_-_491150.jpg', name:'The Old &amp; New Tiger\'s Head', area:'Lee', pc:'SE12', cat:'pub', year:1815, era:'History dating to 1815',
      lat:null, lon:null, addr:'',
      text:'A pair of pubs at the Lee Green crossroads, with a history dating back to at least 1815, when troops moving between Dover and the Battle of Waterloo used the original Tiger\'s Head as a resting place to watch boxing matches and horse and foot races. The original pub stood on the Greenwich side of the road before being rebuilt across the street in the Lewisham borough, leaving both an "Old" and "New" Tiger\'s Head as local landmarks.' },

    { id:'the-old-nun-s-head', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/The_Old_Nun%27s_Head%2C_Nunhead_Green%2C_SE15_-_geograph.org.uk_-_6110680.jpg/330px-The_Old_Nun%27s_Head%2C_Nunhead_Green%2C_SE15_-_geograph.org.uk_-_6110680.jpg', name:'The Old Nun\'s Head', area:'Nunhead', pc:'SE15', cat:'pub', year:1905, era:'First recorded 1583; rebuilt 1905',
      lat:null, lon:null, addr:'',
      text:'A pub on Nunhead Green whose name may be the origin of the area\'s own name &mdash; first recorded as "Nunn-Head" in 1583. Local legend holds that it commemorates a nun beheaded here during the Dissolution of the Monasteries under Henry VIII, a story the pub itself commemorates with a sign, though it may equally derive simply from an old inn called the Nun\'s Head. The current building dates from a 1905 rebuild.' },

    { id:'the-one-tree-hill-enclosure-protest', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Oak_of_Honor_at_One_Tree_Hill%2C_Honor_Oak_%2802%29.jpg/330px-Oak_of_Honor_at_One_Tree_Hill%2C_Honor_Oak_%2802%29.jpg', name:'The One Tree Hill enclosure protest', area:'Honor Oak', pc:'SE23', cat:'memory', year:1897, era:'Protest 1897; land secured for public use 1905',
      lat:null, lon:null, addr:'',
      text:'In 1897, the owner of One Tree Hill &mdash; long used informally as common land by local people to gather firewood, walk and graze animals &mdash; attempted to sell it to a golf club and fence it off from public access. The move provoked a mass local outcry: the Enclosure of Honor Hill Protest Committee formed within days and grew to around 150 members, and the resulting pressure halted the enclosure. The hill was formally acquired by Camberwell Borough Council as public open space in 1905 and remains so today, making it a small but genuine local victory in the wider English history of resistance to the enclosure of common land.' },

    { id:'the-pyrotechnists-arms', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Pyrotechnists_Arms%2C_Nunhead%2C_SE15_%286295068995%29.jpg/330px-Pyrotechnists_Arms%2C_Nunhead%2C_SE15_%286295068995%29.jpg', name:'The Pyrotechnists Arms', area:'Nunhead', pc:'SE15', cat:'pub', year:1868, era:'Named for factory built 1868',
      lat:null, lon:null, addr:'',
      text:'A pub named for Brock\'s fireworks factory, built nearby in 1868 on a large field between the railway embankment and Nunhead Green. The factory has long since gone, but the pub keeps its memory alive through its name &mdash; a nice example of an area\'s industrial history surviving only in a pub sign.' },

    { id:'the-queen-of-catford', img:'', name:'The Queen of Catford', area:'Catford', pc:'SE6', cat:'art', year:null, era:'Completed 2021',
      lat:null, lon:null, addr:'Near the Catford Centre',
      text:'A residential building by Tsuruta Architects decorated with over 27,000 individual cat faces, inside and out. As part of the design, the architects invented a fictional backstory for two former residents &mdash; "Ford" and "Bjorn" &mdash; supposedly linked to the real Windsor Film Studios that operated in Catford during the silent-film era (1914&ndash;1921), and commissioned two official-looking blue plaques mimicking English Heritage\'s style to commemorate the invented pair. It sits in playful architectural conversation with the real Catford Cat nearby &mdash; one an unexplained icon, the other an invented history hiding in plain sight.' },

    { id:'the-southwark-martyrs', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Church_of_the_English_Martyrs%2C_Southwark_-_geograph.org.uk_-_5291053.jpg/330px-Church_of_the_English_Martyrs%2C_Southwark_-_geograph.org.uk_-_5291053.jpg', name:'The Southwark Martyrs', area:'Elephant &amp; Castle', pc:'SE1', cat:'memory', year:1557, era:'Executed May 1557',
      lat:null, lon:null, addr:'',
      text:'In May 1557, three Protestants &mdash; William Morant, Stephen Gratwick and a man recorded only as King &mdash; were burnt at the stake in St George\'s Field during the Marian Persecutions under Queen Mary I, on the site where the Metropolitan Tabernacle now stands. Known as the Southwark Martyrs, their deaths were part of a wider wave of religious executions carried out across England during Mary\'s attempt to reverse the Reformation, and the site\'s later choice for a great Protestant preaching house was no coincidence.' },

    { id:'the-tooley-street-fire', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Fire_Station%2C_Tooley_Street_%28II%29.jpg/330px-Fire_Station%2C_Tooley_Street_%28II%29.jpg', name:'The Tooley Street fire', area:'Bermondsey', pc:'SE16', cat:'memory', year:1861, era:'1861',
      lat:null, lon:null, addr:'',
      text:'A major fire broke out among the riverside warehouses of Tooley Street in 1861, engulfing the densely packed wharves that had earned the area the nickname "London\'s Larder" for its role storing and processing food for the capital. The blaze was one of the largest and most destructive fires in London between the Great Fire of 1666 and the Blitz, reshaping the riverside for decades afterward.' },

    { id:'the-woolwich-pub-bombing', img:'', name:'The Woolwich pub bombing', area:'Woolwich', pc:'SE18', cat:'memory', year:1974, era:'7 November 1974',
      lat:null, lon:null, addr:'',
      text:'On 7 November 1974, the Provisional IRA threw a gelignite bomb through the window of the Kings Arms pub on Frances Street, close to the Royal Artillery Barracks, killing two people &mdash; off-duty soldier Gunner Richard Dunne and sales clerk Alan Horsley &mdash; and injuring 35 others including the landlady. The attack came a month after similar bombings in Guildford, part of the same mainland bombing campaign during the Troubles, and remains one of Woolwich\'s most significant and painful pieces of 20th-century history.' },

    { id:'thomas-middleton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Thomas_Middleton.jpg/330px-Thomas_Middleton.jpg', name:'Thomas Middleton', area:'Elephant &amp; Castle', pc:'SE1', cat:'resident', year:1627, era:'Died 1627',
      lat:null, lon:null, addr:'',
      text:'Jacobean playwright and contemporary of Shakespeare, known for works including "The Revenger\'s Tragedy" and "Women Beware Women." He lived in the area in later life and was buried in St Mary\'s Churchyard, Newington, when he died in 1627.' },

    { id:'tom-cribb', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tom_Cribb_etching.jpg/330px-Tom_Cribb_etching.jpg', name:'Tom Cribb', area:'Woolwich', pc:'SE18', cat:'resident', year:1848, era:'Died in Woolwich 1848',
      lat:null, lon:null, addr:'',
      text:'Bare-knuckle boxing champion of England, born in Bristol but resident in Woolwich until his death there in 1848 aged 66. Cribb was buried at St Mary Magdalene, Woolwich, where his memorial &mdash; a lioness resting a paw on an urn &mdash; still stands in what is now St Mary\'s Gardens.' },

    { id:'w-g-grace', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/WG_Grace_c1902.jpg/330px-WG_Grace_c1902.jpg', name:'W. G. Grace', area:'Sydenham', pc:'SE26', cat:'resident', year:null, era:'',
      lat:null, lon:null, addr:'',
      text:'Widely regarded as one of the greatest cricketers in the sport\'s history, W. G. Grace lived in Sydenham during part of his playing career, a period in which he dominated English cricket for decades and helped shape the modern game.' },

    { id:'walworth-town-hall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Walworth_Town_Hall.jpg/330px-Walworth_Town_Hall.jpg', name:'Walworth Town Hall', area:'Walworth', pc:'SE17', cat:'grand', year:2013, era:'Fire 2013; on Heritage at Risk Register',
      lat:null, lon:null, addr:'',
      text:'Originally the Vestry Hall of St Mary, Newington, it became the headquarters of the Metropolitan Borough of Southwark and was renamed Southwark Town Hall in 1900, reverting to Walworth Town Hall after the enlarged London Borough of Southwark was formed in 1965. From 2006 it housed the Cuming Museum, until a serious fire badly damaged the roof in March 2013, after which the building was added to the Heritage at Risk Register.' },

    { id:'dacres-wood-nature-reserve', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dacres_Wood_3.JPG/330px-Dacres_Wood_3.JPG', name:'Dacres Wood Nature Reserve', area:'Forest Hill', pc:'SE23', cat:'green', year:1836, era:'Nature reserve on the former Croydon Canal, drained 1836',
      lat:51.432, lon:-0.0522, addr:'Dacres Road, SE23',
      text:'A small nature reserve holding the last visible physical remains of the Croydon Canal &mdash; old ponds and retaining walls &mdash; on the route the canal followed before it was drained in 1836 to make way for the London and Croydon Railway.' },

    { id:'desmond-dekker', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Desmond_Dekker_in_2005.jpg/330px-Desmond_Dekker_in_2005.jpg', name:'Desmond Dekker', area:'Honor Oak', pc:'SE23', cat:'resident', year:1963, era:'Lived here',
      lat:51.4482, lon:-0.0478, addr:'Devonshire Road, Honor Oak',
      text:'Ska and reggae musician Desmond Dekker lived on this stretch of Devonshire Road, towards Honor Oak.' },

    { id:'e-w-swanton', img:'', name:'E. W. Swanton', area:'Forest Hill', pc:'SE23', cat:'resident', year:1907, era:'Born here 11 February 1907',
      lat:null, lon:null, addr:'',
      text:'Cricket journalist and broadcaster E. W. Swanton was born in Forest Hill on 11 February 1907, going on to become a leading voice in BBC cricket commentary for decades.' },

    { id:'francis-rossi', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Status_Quo_-_2017215182037_2017-08-03_Wacken_-_Sven_-_1D_X_MK_II_-_0687_-_AK8I8353_%28cropped%29.jpg/330px-Status_Quo_-_2017215182037_2017-08-03_Wacken_-_Sven_-_1D_X_MK_II_-_0687_-_AK8I8353_%28cropped%29.jpg', name:'Francis Rossi', area:'Forest Hill', pc:'SE23', cat:'resident', year:1949, era:'Born here 29 May 1949',
      lat:null, lon:null, addr:'',
      text:'Francis Rossi, co-founder and lead guitarist of Status Quo, was born in Forest Hill on 29 May 1949.' },

    { id:'hayley-squires', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Hayley_Squires_%28cropped%29.jpg/330px-Hayley_Squires_%28cropped%29.jpg', name:'Hayley Squires', area:'Forest Hill', pc:'SE23', cat:'resident', year:1988, era:'Born here 16 April 1988',
      lat:null, lon:null, addr:'',
      text:'Actress Hayley Squires, known for her role in the BBC drama Call the Midwife, was born in Forest Hill on 16 April 1988.' },

    { id:'jon-robyns', img:'', name:'Jon Robyns', area:'Forest Hill', pc:'SE23', cat:'resident', year:2002, era:'Lived here early 2000s',
      lat:51.4348, lon:-0.0556, addr:'Albion Villas Road, Forest Hill',
      text:'Musical theatre actor Jon Robyns lived on Albion Villas Road in the early 2000s.' },

    { id:'luke-pritchard', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/The_Kooks_2026.jpg/330px-The_Kooks_2026.jpg', name:'Luke Pritchard', area:'Forest Hill', pc:'SE23', cat:'resident', year:2006, era:'The Kooks&rsquo; breakout album, 2006',
      lat:null, lon:null, addr:'',
      text:'Luke Pritchard, lead singer of the band The Kooks, was born in Forest Hill.' },

    { id:'michael-gambon-forest-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Michael_Gambon_cropped.jpg/330px-Michael_Gambon_cropped.jpg', name:'Michael Gambon', area:'Forest Hill', pc:'SE23', cat:'resident', year:1960, era:'Lived here early&ndash;mid 1960s',
      lat:51.4382, lon:-0.0601, addr:'Forest Croft, Forest Hill',
      text:'Actor Michael Gambon lived at this art deco mansion block in the early to mid-1960s, decades before he took on the role of Albus Dumbledore in the Harry Potter films.' },

    { id:'millie-my-boy-lollipop', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Millie_Small_%281964%29.jpg/330px-Millie_Small_%281964%29.jpg', name:'Millie', area:'Forest Hill', pc:'SE23', cat:'resident', year:1964, era:'Living here 1964',
      lat:null, lon:null, addr:'',
      text:'Jamaican singer Millie Small &mdash; known simply as Millie &mdash; was living in Forest Hill at the time of her 1964 hit &ldquo;My Boy Lollipop,&rdquo; one of the best-selling singles by a Jamaican artist.' },

    { id:'rachael-wooding', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Rachael_Wooding_as_Rose_in_Standing_at_the_Skys_Edge.jpg/330px-Rachael_Wooding_as_Rose_in_Standing_at_the_Skys_Edge.jpg', name:'Rachael Wooding', area:'Forest Hill', pc:'SE23', cat:'resident', year:2002, era:'Lived here early 2000s',
      lat:51.4348, lon:-0.0556, addr:'Albion Villas Road, Forest Hill',
      text:'Musical theatre performer Rachael Wooding lived on Albion Villas Road in the early 2000s.' },

    { id:'raymond-chandler', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Raymond_Chandler_%28Lady_in_the_Lake_portrait%2C_1943%29.jpg/330px-Raymond_Chandler_%28Lady_in_the_Lake_portrait%2C_1943%29.jpg', name:'Raymond Chandler', area:'Forest Hill', pc:'SE23', cat:'resident', year:1909, era:'Lived here 1909&ndash;1912',
      lat:51.4394, lon:-0.0537, addr:'138 Devonshire Road, SE23',
      text:'Mystery writer Raymond Chandler lived here with his mother from 1909 until 1912, when he returned to America. He would not publish his first novel, The Big Sleep, for another twenty-seven years.' },

    { id:'timothy-spall', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Timothy_Spall_World_Premiere_The_Party_Berlinale_2017_02.jpg/330px-Timothy_Spall_World_Premiere_The_Party_Berlinale_2017_02.jpg', name:'Timothy Spall', area:'Honor Oak', pc:'SE23', cat:'resident', year:1957, era:'Resident of Honor Oak',
      lat:null, lon:null, addr:'',
      text:'Actor Timothy Spall was a resident of Honor Oak.' },

    { id:'vince-hilaire', img:'', name:'Vince Hilaire', area:'Forest Hill', pc:'SE23', cat:'resident', year:1959, era:'Born here 10 October 1959',
      lat:null, lon:null, addr:'',
      text:'Footballer Vince Hilaire was born in Forest Hill on 10 October 1959, and went on to play for Crystal Palace.' },

    { id:'blackheath-rugby-club', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Blackheath_Rugby_Club_pavilion_-_geograph.org.uk_-_6372431.jpg/330px-Blackheath_Rugby_Club_pavilion_-_geograph.org.uk_-_6372431.jpg', name:'Blackheath Rugby Club', area:'Blackheath', pc:'SE3', cat:'memory', year:1858, era:'Founded 1858',
      lat:51.4676, lon:0.0086, addr:'',
      text:'Founded in 1858, Blackheath is one of the oldest rugby clubs in the world; its members organised the first-ever rugby international, England against Scotland, played in Edinburgh in 1871.' },

    { id:'bob-hope-eltham', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Bob_Hope_1969_Publicity_Photo.jpg/330px-Bob_Hope_1969_Publicity_Photo.jpg', name:'Bob Hope', area:'Eltham', pc:'SE9', cat:'plaque', year:1903, era:'Born here 29 May 1903',
      lat:51.4588, lon:0.0531, addr:'44 Craigton Road, SE9',
      text:'Born at this address on 29 May 1903, the entertainer emigrated to America as a child. Eltham&rsquo;s Little Theatre was renamed the Bob Hope Theatre in his honour in 1982, after his donations to it.' },

    { id:'boy-george', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Boy_George_-_2026220_214024_2026-08-08_Die_80er_live_-_Sven_-_1D_X_MK_II_-_1836_-_AK8I4768_%28cropped%29.jpg/330px-Boy_George_-_2026220_214024_2026-08-08_Die_80er_live_-_Sven_-_1D_X_MK_II_-_1836_-_AK8I4768_%28cropped%29.jpg', name:'Boy George', area:'Eltham', pc:'SE9', cat:'resident', year:1961, era:'Grew up here',
      lat:null, lon:null, addr:'',
      text:'Singer Boy George was raised in Middle Park, Eltham, before finding fame as the frontman of Culture Club.' },

    { id:'cornish-rebellion-blackheath', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Statue_of_Michael_Joseph_the_Smith_and_Thomas_Flamank_-_geograph.org.uk_-_1263309.jpg/330px-Statue_of_Michael_Joseph_the_Smith_and_Thomas_Flamank_-_geograph.org.uk_-_1263309.jpg', name:'Cornish Rebellion camp', area:'Blackheath', pc:'SE3', cat:'memory', year:1497, era:'Rebel camp, June 1497',
      lat:51.4676, lon:0.0086, addr:'Blackheath, SE3',
      text:'Cornish rebels protesting Henry VII&rsquo;s war taxes camped on Blackheath before their march on London in June 1497, led by Michael An Gof and Thomas Flamank. Defeated at the foot of the heath in the Battle of Deptford Bridge, both leaders were captured and executed.' },

    { id:'deptford-power-station', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Deptford_Power_Station_1970_-_geograph.org.uk_-_1742937.jpg/330px-Deptford_Power_Station_1970_-_geograph.org.uk_-_1742937.jpg', name:'Deptford Power Station', area:'Deptford', pc:'SE8', cat:'works', year:1891, era:'Opened 1891',
      lat:null, lon:null, addr:'',
      text:'Opened in 1891 to a design by Sebastian de Ferranti, it was the largest power station in the world when built, though technical problems meant it never fully achieved his ambitions for it.' },

    { id:'edward-drummond', img:'', name:'Edward Drummond', area:'Charlton', pc:'SE7', cat:'memory', year:1843, era:'Died 1843, buried here',
      lat:51.4828, lon:0.0347, addr:'St Luke\'s Church, Charlton Church Lane, SE7',
      text:'Prime Minister Robert Peel&rsquo;s private secretary, shot dead in Whitehall in 1843 by a man who had mistaken him for Peel. The case established the M&rsquo;Naghten Rules that still define the insanity defence in English law today. Drummond is buried at St Luke&rsquo;s Church.' },

    { id:'emperor-norton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Norton-2.jpg/330px-Norton-2.jpg', name:'Emperor Norton', area:'Deptford', pc:'SE8', cat:'resident', year:1818, era:'Born here 1818',
      lat:null, lon:null, addr:'',
      text:'Born in Deptford in 1818, Joshua Norton emigrated to San Francisco and in 1859 proclaimed himself &ldquo;Emperor of these United States,&rdquo; becoming a beloved eccentric figure the city humoured for two decades.' },

    { id:'frankie-howerd', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Frankie_Howerd_Allan_Warren.jpg/330px-Frankie_Howerd_Allan_Warren.jpg', name:'Frankie Howerd', area:'Eltham', pc:'SE9', cat:'resident', year:1917, era:'Grew up here',
      lat:null, lon:null, addr:'',
      text:'Comedian and actor Frankie Howerd was born in York in 1917 but brought to Eltham as a young child, where he grew up.' },

    { id:'greenwich-power-station', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Greenwich_Power_Station_-_2022-04-24.jpg/330px-Greenwich_Power_Station_-_2022-04-24.jpg', name:'Greenwich Power Station', area:'Greenwich', pc:'SE10', cat:'works', year:1902, era:'Built 1902&ndash;1910',
      lat:51.4851, lon:-0.0008, addr:'Greenwich, SE10',
      text:'Built 1902&ndash;10 to supply power to London&rsquo;s tram network and Underground; it still operates today as a standby power source for the Tube.' },

    { id:'j-stone-and-co-foundry', img:'', name:'J. Stone &amp; Co', area:'Charlton', pc:'SE7', cat:'works', year:1917, era:'Moved here 1917',
      lat:51.4893, lon:0.0305, addr:'Anchor and Hope Lane, SE7',
      text:'Marine propeller foundry that relocated from Deptford to Charlton in 1917. During the Second World War it produced 22,000 propellers for the Royal Navy, and later made propellers for the liners Queen Mary and Queen Elizabeth.' },

    { id:'joseph-rene-bellot-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Bellot_memorial_in_Greenwich._View_from_the_Thames.jpg/330px-Bellot_memorial_in_Greenwich._View_from_the_Thames.jpg', name:'Joseph Ren&eacute; Bellot memorial', area:'Greenwich', pc:'SE10', cat:'memory', year:1853, era:'Bellot died 1853; memorial erected soon after',
      lat:51.4849, lon:-0.0018, addr:'Greenwich riverside, SE10',
      text:'An obelisk on the riverside commemorates French Arctic explorer Joseph Ren&eacute; Bellot, who died in 1853 while searching for the lost Franklin expedition.' },

    { id:'maryon-park', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Maryon_Park%2C_Charlton%2C_South_East_London.jpg/330px-Maryon_Park%2C_Charlton%2C_South_East_London.jpg', name:'Maryon Park', area:'Charlton', pc:'SE7', cat:'green', year:1966, era:'Blow-Up filmed here, 1966',
      lat:51.4893, lon:0.0425, addr:'Charlton Riverside, SE7',
      text:'Public park created after the Maryon-Wilson family estate was broken up in 1925, later used as the filming location for the pivotal murder scene in Michelangelo Antonioni&rsquo;s Blow-Up (1966).' },

    { id:'morden-college', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Blackheath_%2C_The_Lodge%2C_Morden_College_-_geograph.org.uk_-_7389235.jpg/330px-Blackheath_%2C_The_Lodge%2C_Morden_College_-_geograph.org.uk_-_7389235.jpg', name:'Morden College', area:'Blackheath', pc:'SE3', cat:'grand', year:1695, era:'Founded 1695',
      lat:51.4692, lon:0.0195, addr:'Blackheath, SE3',
      text:'Almshouse founded in 1695 by Sir John Morden for &ldquo;decayed&rdquo; merchants, still operating on its original Blackheath site.' },

    { id:'richard-jefferies', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Richard_jefferies.jpg/330px-Richard_jefferies.jpg', name:'Richard Jefferies', area:'Eltham', pc:'SE9', cat:'plaque', year:1848, era:'Naturalist and writer (1848&ndash;1887)',
      lat:51.4484, lon:0.0631, addr:'59 Footscray Road, SE9',
      text:'Nature writer Richard Jefferies, known for books including The Story of My Heart, is commemorated by a blue plaque at this address.' },

    { id:'royal-blackheath-golf-club', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Royal_Blackheath_Golf_Club-geograph-5795783-by-Robert-Lamb.jpg/330px-Royal_Blackheath_Golf_Club-geograph-5795783-by-Robert-Lamb.jpg', name:'Royal Blackheath Golf Club', area:'Eltham', pc:'SE9', cat:'grand', year:1664, era:'Moved here 1923; clubhouse built 1664',
      lat:51.4455, lon:0.0554, addr:'Eltham Lodge, Court Road, SE9',
      text:'One of the oldest golf clubs in the world, with a tradition of play on Blackheath dating to 1608. The club moved to this Grade I-listed Restoration house, built in 1664, in 1923.' },

    { id:'siemens-brothers-telegraph-works', img:'', name:'Siemens Brothers Telegraph Works', area:'Charlton', pc:'SE7', cat:'works', year:1863, era:'Opened 1863',
      lat:null, lon:null, addr:'',
      text:'Cable works that manufactured two new transatlantic telegraph cables in the 1880s and later contributed to PLUTO, the undersea fuel pipeline laid for the D-Day landings.' },

    { id:'francis-chichester-gipsy-moth', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Sir_Francis_Chichester_%283985431904%29.jpg/330px-Sir_Francis_Chichester_%283985431904%29.jpg', name:'Sir Francis Chichester', area:'Greenwich', pc:'SE10', cat:'maritime', year:1966, era:'Circumnavigation 1966&ndash;1967',
      lat:51.4826, lon:-0.0096, addr:'',
      text:'In 1966&ndash;67 Chichester sailed Gipsy Moth IV single-handed around the world faster than any previous circumnavigator; the yacht was displayed at Greenwich for decades afterward.' },

    { id:'francis-drake-knighted', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/1583_portrait_of_Sir_Francis_Drake.jpg/330px-1583_portrait_of_Sir_Francis_Drake.jpg', name:'Sir Francis Drake knighted', area:'Deptford', pc:'SE8', cat:'maritime', year:1581, era:'Knighted here, 4 April 1581',
      lat:51.4867, lon:-0.03, addr:'Deptford Docks',
      text:'Elizabeth I knighted Francis Drake aboard the Golden Hind at Deptford Docks on 4 April 1581, following his circumnavigation of the globe.' },

    { id:'sir-john-vanbrugh', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/John_Vanbrugh.jpg/330px-John_Vanbrugh.jpg', name:'Sir John Vanbrugh', area:'Blackheath', pc:'SE3', cat:'resident', year:1720, era:'Owned an estate here from c.1720',
      lat:null, lon:null, addr:'',
      text:'Architect Sir John Vanbrugh, designer of Blenheim Palace and Castle Howard, owned an estate on Blackheath from around 1720. Vanbrugh Park and Vanbrugh Castle still carry his name.' },

    { id:'sir-william-langhorne', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Portrait_of_Coll._Langhorne_%284674502%29.jpg/330px-Portrait_of_Coll._Langhorne_%284674502%29.jpg', name:'Sir William Langhorne', area:'Charlton', pc:'SE7', cat:'resident', year:1715, era:'Died 1715, buried here',
      lat:51.4828, lon:0.0347, addr:'St Luke\'s Church, Charlton Church Lane, SE7',
      text:'Colonial administrator and East India Company agent at Madras, Langhorne bought the manor of Charlton and is buried at St Luke&rsquo;s Church.' },

    { id:'st-michael-and-all-angels-blackheath', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/St_Michael_and_All_Angels_Church%2C_Blackheath_Park_-_geograph.org.uk_-_634834.jpg/330px-St_Michael_and_All_Angels_Church%2C_Blackheath_Park_-_geograph.org.uk_-_634834.jpg', name:'St Michael and All Angels Church', area:'Blackheath', pc:'SE3', cat:'grand', year:1828, era:'Built 1828&ndash;1830',
      lat:51.4647, lon:0.0136, addr:'Blackheath Park, SE3',
      text:'Built 1828&ndash;30 to a design by George Smith, its tall thin spire earned it the nickname &ldquo;the Needle of Kent.&rdquo;' },

    { id:'steve-harley', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Cockney_Rebel_-_Steve_Harley_5_%2815094806729%29_%28cropped%29.jpg/330px-Cockney_Rebel_-_Steve_Harley_5_%2815094806729%29_%28cropped%29.jpg', name:'Steve Harley', area:'Deptford', pc:'SE8', cat:'resident', year:1951, era:'Born here 1951',
      lat:null, lon:null, addr:'',
      text:'Frontman of Cockney Rebel, known for the 1975 number one single &ldquo;Come Up and See Me (Make Me Smile),&rdquo; born in Deptford.' },

    { id:'the-pagoda-blackheath', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/The_Pagoda_%289175938843%29.jpg/330px-The_Pagoda_%289175938843%29.jpg', name:'The Pagoda', area:'Blackheath', pc:'SE3', cat:'grand', year:1760, era:'Built 1760',
      lat:51.468, lon:-0.0034, addr:'Pagoda Gardens, SE3',
      text:'Built in 1760 by Sir William Chambers in the Chinese style then fashionable, later leased as a summer home for Caroline of Brunswick, estranged wife of the future George IV.' },

    { id:'trinity-hospital-greenwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Trinity_Hospital%2C_Greenwich_2026-01-24.jpg/330px-Trinity_Hospital%2C_Greenwich_2026-01-24.jpg', name:'Trinity Hospital', area:'Greenwich', pc:'SE10', cat:'grand', year:1613, era:'Founded 1613',
      lat:51.4849, lon:-0.0018, addr:'Greenwich, SE10',
      text:'Almshouse founded in 1613 by Henry Howard, Earl of Northampton &mdash; the oldest surviving building in Greenwich town centre.' },

    { id:'aaron-manby', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Feathered_paddlewheel_of_PS_Aaron_Manby_1822.jpg/330px-Feathered_paddlewheel_of_PS_Aaron_Manby_1822.jpg', name:'Aaron Manby', area:'Rotherhithe', pc:'SE16', cat:'works', year:1822, era:'Iron steamship launched 1822',
      lat:null, lon:null, addr:'Rotherhithe, SE16',
      text:'The engineer Aaron Manby assembled and launched the Aaron Manby at Rotherhithe in 1822 &mdash; the world\'s first seagoing iron-hulled steamship, which went on to steam up the Seine to Paris.' },

    { id:'beestons-gift-almshouses', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Beeston%27s_Gift_Almshouses%2C_Consort_Road_-_geograph.org.uk_-_6890344.jpg/330px-Beeston%27s_Gift_Almshouses%2C_Consort_Road_-_geograph.org.uk_-_6890344.jpg', name:'Beeston\'s Gift Almshouses', area:'Nunhead', pc:'SE15', cat:'grand', year:1834, era:'Founded 1834',
      lat:51.4684, lon:-0.0623, addr:'Consort Road, SE15',
      text:'Beeston\'s Gift Almshouses on Consort Road were founded in 1834 by the Worshipful Company of Girdlers. The terrace of seven Tudor-style cottages still stands behind its railinged garden.' },

    { id:'bermondsey-abbey', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Abbey_Street%2C_Bermondsey_-_geograph.org.uk_-_4385676.jpg/330px-Abbey_Street%2C_Bermondsey_-_geograph.org.uk_-_4385676.jpg', name:'Bermondsey Abbey', area:'Bermondsey', pc:'SE1', cat:'grand', year:1082, era:'Founded 1082, dissolved 1538',
      lat:51.5045, lon:-0.0833, addr:'Bermondsey Street, SE1',
      text:'Bermondsey Abbey was founded in 1082 as a Cluniac priory dedicated to St Saviour. Its monks drained and embanked the surrounding marshland and created St Saviour\'s Dock from a tidal inlet, shaping the area long after the abbey itself was dissolved in 1538.' },

    { id:'donkin-hall-and-gamble', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/BryanDonkin.jpg/330px-BryanDonkin.jpg', name:'Donkin, Hall and Gamble', area:'Bermondsey', pc:'SE16', cat:'works', year:1812, era:'Founded 1812',
      lat:51.4933, lon:-0.0638, addr:'Blue Anchor Lane, SE16',
      text:'Bryan Donkin, John Hall and John Gamble set up a canning works on Blue Anchor Lane in 1812, founding what\'s considered the world\'s first commercial food-canning business.' },

    { id:'edward-turner-motorcycle', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Edward_Turner_Blue_Plaque_Unveiling1.jpg/330px-Edward_Turner_Blue_Plaque_Unveiling1.jpg', name:'Edward Turner', area:'Peckham', pc:'SE15', cat:'plaque', year:2009, era:'Blue plaque unveiled 2009',
      lat:51.4656, lon:-0.0653, addr:'8 Philip Walk, SE15',
      text:'The motorcycle designer Edward Turner, creator of the Triumph Speed Twin, once ran a motorbike shop, Chepstow Motors, on Peckham High Street. A blue plaque was unveiled at his former home, 8 Philip Walk, by the London Borough of Southwark in 2009.' },

    { id:'gary-oldman', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Gary_Oldman_%2813925515511%29_%28cropped%29.jpg/330px-Gary_Oldman_%2813925515511%29_%28cropped%29.jpg', name:'Gary Oldman', area:'New Cross', pc:'SE14', cat:'resident', year:1958, era:'Born 1958',
      lat:null, lon:null, addr:'New Cross, SE14',
      text:'Gary Oldman was born in New Cross in 1958 and attended Monson Primary School in the area. His breakout film as writer and star, Nil by Mouth (1997), is loosely based on his own upbringing in south-east London and was largely filmed around here.' },

    { id:'goldsmiths-royal-naval-school', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Goldsmiths%2C_University_of_London.jpg/330px-Goldsmiths%2C_University_of_London.jpg', name:'Goldsmiths, University of London', area:'New Cross', pc:'SE14', cat:'grand', year:1904, era:'Became part of the University of London in 1904',
      lat:51.4733, lon:-0.0366, addr:'Lewisham Way, SE14',
      text:'What became Goldsmiths, University of London began as the Royal Naval School, founded in 1843. The Worshipful Company of Goldsmiths bought the site and opened the Goldsmiths\' Company\'s Technical and Recreative Institute here in 1891, before handing the college over to the University of London in 1904.' },

    { id:'harold-bride', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/BrideTitanic2.jpg/330px-BrideTitanic2.jpg', name:'Harold Bride', area:'Nunhead', pc:'SE15', cat:'resident', year:1890, era:'Born 1890',
      lat:null, lon:null, addr:'Nunhead, SE15',
      text:'Harold Bride, born in Nunhead in 1890, was the junior wireless operator aboard RMS Titanic. He worked through the sinking sending distress calls alongside senior operator Jack Phillips and survived by scrambling onto an overturned lifeboat.' },

    { id:'jones-and-higgins', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jones_and_Higgins_-_geograph.org.uk_-_1741847.jpg/330px-Jones_and_Higgins_-_geograph.org.uk_-_1741847.jpg', name:'Jones &amp; Higgins', area:'Peckham', pc:'SE15', cat:'grand', year:1867, era:'Traded 1867&ndash;1980s',
      lat:51.4661, lon:-0.0662, addr:'Rye Lane, SE15',
      text:'Jones &amp; Higgins opened on the corner of Rye Lane and Peckham High Street in 1867 and grew into the best-known department store in south London, trading for over a century before closing in the 1980s.' },

    { id:'king-mutesa-ii', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sir._Edward_Fredrick_Mutesa%2C_The_President_of_Uganda_%28cropped%29.jpg/330px-Sir._Edward_Fredrick_Mutesa%2C_The_President_of_Uganda_%28cropped%29.jpg', name:'King Mutesa II of Buganda', area:'Rotherhithe', pc:'SE16', cat:'resident', year:1969, era:'Died in exile, 1969',
      lat:null, lon:null, addr:'Rotherhithe, SE16',
      text:'Mutesa II, the exiled King (Kabaka) of Buganda, spent his final years living quietly in a flat in Rotherhithe. He died there in 1969, shortly after giving an interview to the journalist John Simpson.' },

    { id:'marie-lloyd', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Marie_Lloyd_by_Langfier_Ltd.jpg/330px-Marie_Lloyd_by_Langfier_Ltd.jpg', name:'Marie Lloyd', area:'New Cross', pc:'SE14', cat:'resident', year:1887, era:'Lived here 1887&ndash;1893',
      lat:51.4756, lon:-0.0362, addr:'Lewisham Way, SE14',
      text:'The music hall star Marie Lloyd, celebrated for songs like \'The Boy I Love is Up in the Gallery\', lived on Lewisham Way from 1887 to 1893, early in a career that would make her one of the best-loved performers of her era.' },

    { id:'new-cross-v2-bombing', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Former_Woolworths_store_277-281_New_Cross_Road_London_SE14_6AS.jpg/330px-Former_Woolworths_store_277-281_New_Cross_Road_London_SE14_6AS.jpg', name:'New Cross Woolworths V-2 bombing', area:'New Cross', pc:'SE14', cat:'memory', year:1944, era:'25 November 1944',
      lat:51.4755, lon:-0.0469, addr:'New Cross Road, SE14',
      text:'On 25 November 1944, a V-2 rocket struck the Woolworths store on New Cross Road at the height of a Saturday lunchtime crowd. It killed 168 people and seriously injured 121 more &mdash; London\'s single most devastating V-weapon strike of the Second World War.' },

    { id:'peek-freans-biscuit-town', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Former_Peek_Freans_factory_2024-03-23.jpg/330px-Former_Peek_Freans_factory_2024-03-23.jpg', name:'Peek Frean Biscuit Factory', area:'Bermondsey', pc:'SE16', cat:'works', year:1866, era:'Clements Road factory 1866&ndash;1989',
      lat:51.4951, lon:-0.064, addr:'Clements Road, SE16',
      text:'Peek Frean began making biscuits at Dockhead in 1857 and moved to a much larger factory on Clements Road in 1866, where it produced the Garibaldi and other well-known biscuits until the plant closed in 1989 &mdash; earning Bermondsey its old nickname, \'Biscuit Town\'.' },

    { id:'samuel-bourne-bevington', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Samuel_Bourne_Bevington_V.D.J.P._1832-1907%2C_Tooley_Street_-_geograph.org.uk_-_2497126.jpg/330px-Samuel_Bourne_Bevington_V.D.J.P._1832-1907%2C_Tooley_Street_-_geograph.org.uk_-_2497126.jpg', name:'Samuel Bourne Bevington', area:'Bermondsey', pc:'SE1', cat:'resident', year:1900, era:'First Mayor of Bermondsey, 1900',
      lat:51.5052, lon:-0.0846, addr:'Tooley Street, SE1',
      text:'Samuel Bourne Bevington, a leather producer and one of Bermondsey\'s largest employers, became the first mayor of the newly created Metropolitan Borough of Bermondsey in 1900. A statue commemorating him stands on Tooley Street.' },

    { id:'sir-barnes-wallis', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Barnes_Wallis_%28RNV%29.jpg/330px-Barnes_Wallis_%28RNV%29.jpg', name:'Sir Barnes Wallis', area:'New Cross', pc:'SE14', cat:'plaque', year:1892, era:'Lived here 1892&ndash;1909',
      lat:51.4745, lon:-0.0433, addr:'241 New Cross Road, SE14',
      text:'The engineer and inventor Barnes Wallis, later famous for the bouncing bomb used in the 1943 Dambusters raid, lived at 241 New Cross Road, on the corner of Nettleton Road, from 1892 to 1909. A blue plaque now marks the house.' },

    { id:'st-antholins-church-nunhead', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/St_Antholin_%288667807175%29.jpg/330px-St_Antholin_%288667807175%29.jpg', name:'St Antholin\'s Church, Nunhead', area:'Nunhead', pc:'SE15', cat:'grand', year:1877, era:'Built 1877',
      lat:51.4654, lon:-0.0585, addr:'Nunhead Green, SE15',
      text:'St Antholin\'s Church on Nunhead Green was built in 1877 in red brick, in a style modelled on 13th-century Gothic, using funds raised from the sale of the demolished City church of St Antholin, Budge Row. It carried over a reredos designed by Christopher Wren from the original building.' },

    { id:'bermondsey-1983-by-election', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Simon_Hughes_MP_%282867656375%29.jpg/330px-Simon_Hughes_MP_%282867656375%29.jpg', name:'The 1983 Bermondsey by-election', area:'Bermondsey', pc:'SE1', cat:'memory', year:1983, era:'24 February 1983',
      lat:null, lon:null, addr:'Bermondsey, SE1/SE16',
      text:'The 1983 Bermondsey by-election saw Labour\'s Peter Tatchell lose to the Liberal candidate Simon Hughes on a 44% swing &mdash; still the largest by-election swing in British political history. Hughes went on to represent the constituency until 2015.' },

    { id:'mayflower-departure-1620', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Great_Men_and_Famous_Women_Volume_1_-_DEPARTURE_OF_THE_MAYFLOWER.png/330px-Great_Men_and_Famous_Women_Volume_1_-_DEPARTURE_OF_THE_MAYFLOWER.png', name:'The Mayflower\'s departure', area:'Rotherhithe', pc:'SE16', cat:'maritime', year:1620, era:'July 1620',
      lat:51.5045, lon:-0.046, addr:'Rotherhithe Street, SE16',
      text:'In July 1620, the Mayflower set sail from Rotherhithe, picking up passengers before heading to Southampton to take on supplies for the voyage to America. The riverside Mayflower pub trades on that history, though the building itself only dates from the 1950s.' },

    { id:'thomas-coram', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hogarth_coram.jpg/330px-Hogarth_coram.jpg', name:'Thomas Coram', area:'Rotherhithe', pc:'SE16', cat:'resident', year:1739, era:'Campaigned from Rotherhithe; Foundling Hospital chartered 1739',
      lat:null, lon:null, addr:'Rotherhithe, SE16',
      text:'The retired sea captain and philanthropist Thomas Coram settled in Rotherhithe, where he campaigned for years to establish a home for London\'s abandoned children. His efforts led to the Foundling Hospital, chartered in 1739.' },

    { id:'william-blake-peckham-rye', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/William_Blake_by_Thomas_Phillips.jpg/330px-William_Blake_by_Thomas_Phillips.jpg', name:'William Blake\'s vision at Peckham Rye', area:'Peckham', pc:'SE15', cat:'memory', year:1767, era:'Vision in 1767, memorial mural added 1993',
      lat:51.47, lon:-0.0694, addr:'Peckham Rye, SE15',
      text:'As a boy in 1767, William Blake later recalled wandering across Peckham Rye and seeing a tree filled with angels, "bespangling every bough like stars". In 1993, the Dulwich Festival commissioned artist Stan Peskett to paint a mural of the vision near the Goose Green playground in East Dulwich.' },

    { id:'austin-osman-spare', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Austin_Osman_Spare.jpg/330px-Austin_Osman_Spare.jpg', name:'Austin Osman Spare', area:'Elephant &amp; Castle', pc:'SE17', cat:'resident', year:1904, era:'First public exhibition 1904',
      lat:51.4912, lon:-0.0976, addr:'Walworth Road, SE17',
      text:'The self-taught artist and occultist Austin Osman Spare, later celebrated for his automatic drawing and sigil magic, held his first public exhibition in 1904 at Newington Public Library, not far from the flat above a Walworth Road shop where he later lived.' },

    { id:'brockwell-lido', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Brockwell_Lido_%281%29.jpg/330px-Brockwell_Lido_%281%29.jpg', name:'Brockwell Lido', area:'Herne Hill', pc:'SE24', cat:'green', year:1937, era:'Opened 1937',
      lat:51.453, lon:-0.1065, addr:'Dulwich Road, SE24',
      text:'Brockwell Lido opened in 1937 as one of a wave of open-air swimming pools built across London in the interwar years. It survived a threatened closure in the 1990s and remains a popular outdoor pool today, now Grade II listed.' },

    { id:'charles-haddon-spurgeon', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Charles_Haddon_Spurgeon_by_Alexander_Melville.jpg/330px-Charles_Haddon_Spurgeon_by_Alexander_Melville.jpg', name:'Charles Haddon Spurgeon', area:'Elephant &amp; Castle', pc:'SE1', cat:'resident', year:1861, era:'Preached here from 1861',
      lat:51.4941, lon:-0.1013, addr:'Metropolitan Tabernacle, Elephant &amp; Castle, SE1',
      text:'The celebrated Baptist preacher Charles Haddon Spurgeon moved his congregation to the newly built Metropolitan Tabernacle at Elephant and Castle in 1861, preaching to packed crowds there until his death in 1892.' },

    { id:'frank-stubbs-vc', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Edward_Frank_Gillett%CB%90_Stubbs_has_his_hand_cut_off_%28Hutchinsons_Story_of_the_British_Nation%2C_1922%29.jpg/330px-Edward_Frank_Gillett%CB%90_Stubbs_has_his_hand_cut_off_%28Hutchinsons_Story_of_the_British_Nation%2C_1922%29.jpg', name:'Frank Stubbs', area:'Walworth', pc:'SE17', cat:'resident', year:1888, era:'Born 1888',
      lat:51.4901, lon:-0.0907, addr:'Walworth, SE17',
      text:'Frank Stubbs, born in Walworth in December 1888, was awarded the Victoria Cross for his bravery during the First World War, one of a number of VC recipients this corner of south London produced.' },

    { id:'frankie-fraser', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Mad_Frankie_Fraser_outside_the_Repton_Boxing_club.jpg/330px-Mad_Frankie_Fraser_outside_the_Repton_Boxing_club.jpg', name:'Frankie Fraser', area:'Elephant &amp; Castle', pc:'SE17', cat:'resident', year:1923, era:'Born 1923',
      lat:51.4903, lon:-0.097, addr:'Walworth Road, SE17',
      text:'The gangster Frankie \'Mad Frankie\' Fraser, later notorious for his work as an enforcer for the Richardson gang, moved to Walworth Road at the age of five and became one of south London\'s most feared underworld figures.' },

    { id:'herne-hill-velodrome', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Herne_Hill_Velodrome%2C_15_July_2012.jpg/330px-Herne_Hill_Velodrome%2C_15_July_2012.jpg', name:'Herne Hill Velodrome', area:'Herne Hill', pc:'SE24', cat:'grand', year:1891, era:'Built 1891; hosted the 1948 Olympics',
      lat:51.4507, lon:-0.0918, addr:'Burbage Road, SE24',
      text:'Herne Hill Velodrome opened in 1891 and went on to host the track cycling events of the 1948 London Olympics, making it one of the oldest cycling tracks in the world still in regular use.' },

    { id:'joseph-chamberlain', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Joseph_Chamberlain_MP.png/330px-Joseph_Chamberlain_MP.png', name:'Joseph Chamberlain', area:'Camberwell', pc:'SE5', cat:'resident', year:1836, era:'Born 1836',
      lat:51.4746, lon:-0.0925, addr:'Camberwell, SE5',
      text:'The statesman Joseph Chamberlain, who went on to serve as Mayor of Birmingham and Colonial Secretary, was born in Camberwell in 1836, into a family of shoemakers and businessmen.' },

    { id:'mark-ashton-lgsm', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mark_Ashton_1986.png/330px-Mark_Ashton_1986.png', name:'Mark Ashton', area:'Elephant &amp; Castle', pc:'SE17', cat:'memory', year:1984, era:'Founded LGSM here, 1984',
      lat:51.4928, lon:-0.0963, addr:'Heygate Estate, SE17',
      text:'The activist Mark Ashton, living on the Heygate Estate, co-founded Lesbians and Gays Support the Miners in 1984, forging an alliance between the LGBT and mining communities later dramatised in the film Pride.' },

    { id:'royal-surrey-gardens', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/In_honor_of_her_Majesty%27s_birthday._Under_the_immediate_patronage_of_the_Queen._Royal_zoological_gardens%2C_Surrey._On_Thursday%2C_May_24th.%2C_1838._The_first_ascent_of_the_great_Montgolfier_balloon_will_take_place_at..._-_btv1b8509522d.jpg/330px-In_honor_of_her_Majesty%27s_birthday._Under_the_immediate_patronage_of_the_Queen._Royal_zoological_gardens%2C_Surrey._On_Thursday%2C_May_24th.%2C_1838._The_first_ascent_of_the_great_Montgolfier_balloon_will_take_place_at..._-_btv1b8509522d.jpg', name:'Royal Surrey Zoological Gardens', area:'Walworth', pc:'SE17', cat:'green', year:1831, era:'Zoo and pleasure gardens, 1831&ndash;1856',
      lat:51.4901, lon:-0.1041, addr:'Penton Place, SE17',
      text:'The Surrey Zoological Gardens opened in 1831 around a vast conservatory said to be the largest glass building in England at the time. It drew huge crowds as a rival to London Zoo before closing in 1856, its animals sold off; the site later became the smaller public park now known as Pasley Park.' },

    { id:'sam-mussabini', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Willie_Applegarth_and_Sam_Mussabini_1912.jpg/330px-Willie_Applegarth_and_Sam_Mussabini_1912.jpg', name:'Sam Mussabini', area:'Herne Hill', pc:'SE24', cat:'plaque', year:2012, era:'Blue plaque unveiled 2012',
      lat:51.4519, lon:-0.0962, addr:'84 Burbage Road, SE24',
      text:'The athletics coach Sam Mussabini trained Harold Abrahams to his 100m gold at the 1924 Paris Olympics, a story told in the film Chariots of Fire. A blue plaque was unveiled at his former home on Burbage Road in 2012 by Lord Terence Higgins and actor Ben Cross, who played Abrahams on screen.' },

    { id:'sax-rohmer', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Sax_Rohmer_c._1929.jpg/330px-Sax_Rohmer_c._1929.jpg', name:'Sax Rohmer', area:'Herne Hill', pc:'SE24', cat:'plaque', year:1912, era:'Fu Manchu debuted 1912&ndash;13',
      lat:51.4574, lon:-0.0953, addr:'51 Herne Hill, SE24',
      text:'The writer Sax Rohmer, born Arthur Henry Sarsfield Ward, lived at 51 Herne Hill, now marked with a blue plaque. His serial The Mystery of Dr Fu-Manchu, first published in 1912&ndash;13, made him one of the best-selling thriller writers of the early 20th century.' },

    { id:'syd-barrett-camberwell', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Pink_Floyd_1967_with_Syd_Barrett_%28higher_quality%29_%28headshot%29.jpg/330px-Pink_Floyd_1967_with_Syd_Barrett_%28higher_quality%29_%28headshot%29.jpg', name:'Syd Barrett', area:'Camberwell', pc:'SE5', cat:'resident', year:1964, era:'Studied here from 1964',
      lat:51.4743, lon:-0.0802, addr:'Camberwell College of Arts, Peckham Road, SE5',
      text:'Syd Barrett, founding member and guiding creative force of Pink Floyd, enrolled at Camberwell College of Arts in 1964, before the band\'s early success drew him away from painting and into psychedelic pop stardom.' },

    { id:'hope-theatre-bankside', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Hope_playhouse_-_Hollar%27s_View_of_London_%281647%29.png/330px-Hope_playhouse_-_Hollar%27s_View_of_London_%281647%29.png', name:'The Hope Theatre', area:'Bankside', pc:'SE1', cat:'culture', year:1614, era:'Built 1613&ndash;14',
      lat:51.5082, lon:-0.0991, addr:'Bankside, SE1',
      text:'Built by the entrepreneur Philip Henslowe in 1613&ndash;14, the Hope was a dual-purpose Bankside venue: a playhouse by day and a bear- and bull-baiting arena by night, with a removable stage that could be cleared away between performances.' },

    { id:'lakanal-house-fire', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Lakanal_House_Aug_2021_photo_1.jpg/330px-Lakanal_House_Aug_2021_photo_1.jpg', name:'The Lakanal House fire', area:'Camberwell', pc:'SE5', cat:'memory', year:2009, era:'3 July 2009',
      lat:51.475, lon:-0.0809, addr:'Sceaux Gardens, SE5',
      text:'On 3 July 2009, a fire tore through the 14-storey Lakanal House tower block on the Sceaux Gardens estate, killing six people. The subsequent inquest exposed serious failings in fire safety guidance and refurbishment work, and the tragedy was cited in the years after the Grenfell Tower fire as an earlier, unheeded warning.' },

    { id:'thomas-hood-camberwell', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Thomas_Hood_from_NPG.jpg/330px-Thomas_Hood_from_NPG.jpg', name:'Thomas Hood', area:'Camberwell', pc:'SE5', cat:'resident', year:1840, era:'Lived here 1840&ndash;1841',
      lat:51.4746, lon:-0.0925, addr:'Camberwell, SE5',
      text:'The poet and humorist Thomas Hood, best remembered for his protest poem \'The Song of the Shirt\', lived in Camberwell from 1840 to 1841, part of a peripatetic career spent largely one step ahead of his creditors.' },

    { id:'william-booth-memorial-college', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/William_Booth_Memorial_Training_College%2C_Champion_Park_SE5_-_geograph.org.uk_-_1312917.jpg/330px-William_Booth_Memorial_Training_College%2C_Champion_Park_SE5_-_geograph.org.uk_-_1312917.jpg', name:'William Booth Memorial Training College', area:'Camberwell', pc:'SE5', cat:'grand', year:1932, era:'Completed 1932',
      lat:51.4675, lon:-0.0878, addr:'Champion Park, SE5',
      text:'The Salvation Army\'s officer training college was completed in 1932 to a design by Sir Giles Gilbert Scott, the architect also responsible for Battersea Power Station and the red telephone box. Its tall brick tower is a Camberwell landmark.' },

    { id:'andrew-bonar-law-penge', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Bonar_Law_1923_portrait_by_Walter_Stoneman_%283x4_cropped%29.jpg/330px-Bonar_Law_1923_portrait_by_Walter_Stoneman_%283x4_cropped%29.jpg', name:'Andrew Bonar Law', area:'Penge', pc:'SE20', cat:'resident', year:1858, era:'Lived on Oakfield Road',
      lat:51.415, lon:-0.0612, addr:'Oakfield Road, SE20',
      text:'Andrew Bonar Law, who served as Prime Minister for just over seven months in 1922&ndash;23, the shortest premiership of the 20th century, lived on Oakfield Road in Penge earlier in his career.' },

    { id:'central-hill-estate', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Central_Hill_estate_%E2%80%93_estate_plan_-_geograph.org.uk_-_7224911.jpg/330px-Central_Hill_estate_%E2%80%93_estate_plan_-_geograph.org.uk_-_7224911.jpg', name:'Central Hill Estate', area:'Gipsy Hill', pc:'SE19', cat:'grand', year:1974, era:'Built 1967&ndash;74',
      lat:51.421, lon:-0.0886, addr:'Central Hill, SE19',
      text:'Designed by Rosemary Stjernstedt and Roger Westman for the Greater London Council and built between 1967 and 1974, the low-rise, terraced Central Hill Estate follows the steep contours of the hillside and is regarded as one of the finest examples of the era\'s socially-minded council housing.' },

    { id:'christ-church-gipsy-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Christ_Church%2C_Gipsy_Hill_-_geograph.org.uk_-_2248238.jpg/330px-Christ_Church%2C_Gipsy_Hill_-_geograph.org.uk_-_2248238.jpg', name:'Christ Church, Gipsy Hill', area:'Gipsy Hill', pc:'SE19', cat:'grand', year:1867, era:'Consecrated 1867, tower survives from a 1982 fire',
      lat:51.4223, lon:-0.0835, addr:'Highland Road, SE19',
      text:'Christ Church was consecrated in 1867, one of the first buildings put up on Gipsy Hill after the Crystal Palace relocated nearby. A fire in 1982 destroyed most of the Victorian building, leaving only its tower standing; the tower was later converted into a private dwelling, and a new church was built alongside it in 1987.' },

    { id:'crystal-palace-transmitter', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/View_of_the_Crystal_Palace_TV_transmitter_from_Crystal_Palace_Park_%5E4_-_geograph.org.uk_-_4491253.jpg/330px-View_of_the_Crystal_Palace_TV_transmitter_from_Crystal_Palace_Park_%5E4_-_geograph.org.uk_-_4491253.jpg', name:'Crystal Palace Transmitter', area:'Crystal Palace', pc:'SE19', cat:'works', year:1956, era:'Completed 1956',
      lat:51.424, lon:-0.0749, addr:'Crystal Palace Park, SE19',
      text:'Completed in 1956, the 219-metre Crystal Palace Transmitter became the tallest structure in London on completion and remains the fourth tallest in the city, broadcasting television and radio signals across the capital.' },

    { id:'dadabhai-naoroji-penge', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Dadabhai_Naoroji_1889.jpg/330px-Dadabhai_Naoroji_1889.jpg', name:'Dadabhai Naoroji', area:'Penge', pc:'SE20', cat:'resident', year:1897, era:'Lived here 1897&ndash;1904/5',
      lat:51.4147, lon:-0.0673, addr:'72 Anerley Park, SE20',
      text:'Dadabhai Naoroji, the Indian independence campaigner who in 1892 became the first Asian elected to the British Parliament, lived at 72 Anerley Park from 1897 until around 1904/5.' },

    { id:'emile-zola-crystal-palace', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Nadar_%28atelier_de%29_-_Emile_Zola%2C_13-556535.jpg/330px-Nadar_%28atelier_de%29_-_Emile_Zola%2C_13-556535.jpg', name:'Émile Zola', area:'Crystal Palace', pc:'SE19', cat:'resident', year:1898, era:'Exiled here, October 1898 &ndash; June 1899',
      lat:51.4164, lon:-0.0739, addr:'Church Road, SE19',
      text:'The French novelist Émile Zola fled to England in 1898 after his open letter \'J\'Accuse...!\' in defence of the wrongly convicted Alfred Dreyfus left him facing prosecution at home. He spent part of his exile at the Queen\'s Hotel on Church Road, from October 1898 until June 1899.' },

    { id:'errol-brown', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Plaque_to_Errol_Brown_lead_singer_of_Hot_Chocolate_-_geograph.org.uk_-_7650697.jpg/330px-Plaque_to_Errol_Brown_lead_singer_of_Hot_Chocolate_-_geograph.org.uk_-_7650697.jpg', name:'Errol Brown', area:'Gipsy Hill', pc:'SE19', cat:'resident', year:1970, era:'Lived on Alexandra Drive',
      lat:51.4245, lon:-0.084, addr:'Alexandra Drive, SE19',
      text:'Errol Brown, lead singer and co-founder of Hot Chocolate, lived on Alexandra Drive in Gipsy Hill. The band\'s run of hits through the 1970s and 80s, including \'You Sexy Thing\', made them one of the most consistently successful British acts of the era.' },

    { id:'helena-normanton', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Photograph_of_Helena_Normanton_c._1930_%2822770439042%29.jpg/330px-Photograph_of_Helena_Normanton_c._1930_%2822770439042%29.jpg', name:'Helena Normanton', area:'Penge', pc:'SE20', cat:'resident', year:1922, era:'First woman barrister in the UK, called to the bar 1922',
      lat:51.4138, lon:-0.0517, addr:'Penge, SE20',
      text:'Helena Normanton, who in 1922 became the first woman to practise as a barrister in England, and later the first female King\'s Counsel, grew up in Penge.' },

    { id:'ira-aldridge', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ira_Aldridge_%281807-1867%29%2C_in_the_character_of_Othello%2C_Attributed_to_James_Northcote_%281746-1831%29.jpg/330px-Ira_Aldridge_%281807-1867%29%2C_in_the_character_of_Othello%2C_Attributed_to_James_Northcote_%281746-1831%29.jpg', name:'Ira Aldridge', area:'Crystal Palace', pc:'SE19', cat:'resident', year:1867, era:'Lived on Hamlet Road',
      lat:51.415, lon:-0.0745, addr:'Hamlet Road, SE19',
      text:'The African-American Shakespearean actor Ira Aldridge, celebrated across Europe for his Othello and one of the first Black actors to achieve major success on the British stage, lived on Hamlet Road in Upper Norwood.' },

    { id:'lee-rigby-memorial', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Floral_tributes_to_Drummer_Lee_Rigby_near_the_Royal_Artillery_Barracks_-_geograph.org.uk_-_3481432.jpg/330px-Floral_tributes_to_Drummer_Lee_Rigby_near_the_Royal_Artillery_Barracks_-_geograph.org.uk_-_3481432.jpg', name:'Lee Rigby', area:'Woolwich', pc:'SE18', cat:'memory', year:2013, era:'22 May 2013',
      lat:51.4839, lon:0.0533, addr:'near Royal Artillery Barracks, SE18',
      text:'On 22 May 2013, off-duty soldier Lee Rigby was murdered near the Royal Artillery Barracks in a terrorist attack that shocked the country. A permanent memorial to him was later installed in Woolwich.' },

    { id:'joseph-paxton-crystal-palace', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Joseph_Paxton_by_Maull_%26_Co%2C_c1860s.jpg/330px-Joseph_Paxton_by_Maull_%26_Co%2C_c1860s.jpg', name:'Sir Joseph Paxton', area:'Crystal Palace', pc:'SE26', cat:'resident', year:1854, era:'Lived here after the Palace moved, from 1854',
      lat:51.4275, lon:-0.0578, addr:'Westwood Hill, SE26',
      text:'Sir Joseph Paxton, designer of the Crystal Palace for the 1851 Great Exhibition, lived at Rockhills on Westwood Hill after the building was re-erected on Sydenham Hill in 1854, close to the structure that gave the area its name.' },

    { id:'garrison-church-st-george', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/2018_Woolwich%2C_St_George%27s_Garrison_Church.jpg/330px-2018_Woolwich%2C_St_George%27s_Garrison_Church.jpg', name:'St George\'s Garrison Church', area:'Woolwich', pc:'SE18', cat:'memory', year:1944, era:'Built 1862&ndash;63, bombed 1944',
      lat:51.4848, lon:0.0625, addr:'Grand Depot Road, SE18',
      text:'Built in 1862&ndash;63 for the Woolwich Royal Artillery garrison, St George\'s was gutted by a V-1 flying bomb on 13 July 1944. Its roofless brick shell, with surviving mosaics and memorials, has since been restored as a public ruin and memorial garden.' },

    { id:'thames-barrier', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Zephyr%2C_Thames_Barrier%2C_Woolwich_Reach%2C_River_Thames%2C_Tall_Ships_Festivals_2017%2C_London_%2833997901316%29.jpg/330px-Zephyr%2C_Thames_Barrier%2C_Woolwich_Reach%2C_River_Thames%2C_Tall_Ships_Festivals_2017%2C_London_%2833997901316%29.jpg', name:'Thames Barrier', area:'Woolwich', pc:'SE18', cat:'works', year:1984, era:'Officially opened 8 May 1984',
      lat:51.4969, lon:0.0373, addr:'Woolwich Reach, SE18',
      text:'The Thames Barrier, spanning 520 metres across the river near Woolwich, was officially opened by the Queen on 8 May 1984 after eight years of construction. It remains one of the largest movable flood barriers in the world, protecting central London from tidal surges.' },

    { id:'crooked-billet-penge', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Crooked_Billet%2C_Penge%2C_SE20.jpg/330px-Crooked_Billet%2C_Penge%2C_SE20.jpg', name:'The Crooked Billet', area:'Penge', pc:'SE20', cat:'pub', year:1601, era:'Documented from 1601',
      lat:51.416, lon:-0.0532, addr:'99 High Street, SE20',
      text:'The Crooked Billet is first documented in 1601, making it one of the oldest recorded pubs in the area. It was rebuilt in the 19th century after the 1827 Penge Inclosure Act moved it from its original spot on the green.' },

    { id:'crystal-palace-dinosaurs', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Dinosaurs%2C_Crystal_Palace_Park_-_geograph.org.uk_-_2118137.jpg/330px-Dinosaurs%2C_Crystal_Palace_Park_-_geograph.org.uk_-_2118137.jpg', name:'The Crystal Palace Dinosaurs', area:'Crystal Palace', pc:'SE20', cat:'art', year:1854, era:'Unveiled 1854',
      lat:51.4214, lon:-0.07, addr:'Crystal Palace Park, SE20',
      text:'Sculpted by Benjamin Waterhouse Hawkins under the guidance of Sir Richard Owen and unveiled in 1854, the Crystal Palace Dinosaurs were the world\'s first dinosaur sculptures, decades before palaeontology understood what these animals really looked like. Now Grade I listed, they still stand in the park today, endearingly inaccurate.' },

    { id:'rotunda-woolwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Woolwich_Rotunda.jpg/330px-Woolwich_Rotunda.jpg', name:'The Rotunda', area:'Woolwich', pc:'SE18', cat:'grand', year:1820, era:'Rebuilt at Woolwich 1818&ndash;20',
      lat:51.4805, lon:0.053, addr:'Repository Road, SE18',
      text:'John Nash\'s Rotunda began life in 1814 as a temporary ballroom in the gardens of Carlton House for the Prince Regent. In 1818 it was dismantled and rebuilt at Woolwich as a permanent structure, reopening in 1820 as a museum of the Royal Artillery, a role it held until the collection moved to Firepower in 2001.' },

    { id:'thomas-crapper-penge', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Thomas_Crapper.jpg/330px-Thomas_Crapper.jpg', name:'Thomas Crapper', area:'Penge', pc:'SE20', cat:'resident', year:1910, era:'Retired here until his death in 1910',
      lat:null, lon:null, addr:'Penge, SE20',
      text:'The Victorian sanitary engineer Thomas Crapper, who popularised and improved the flush toilet through his Chelsea showroom, retired to a house in Penge, where he lived out his final years until his death in 1910.' },

    { id:'woolwich-dockyard', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Woolwich_Dockyard%2C_1789.jpg/330px-Woolwich_Dockyard%2C_1789.jpg', name:'Woolwich Dockyard', area:'Woolwich', pc:'SE18', cat:'maritime', year:1512, era:'Operated 1512&ndash;1869',
      lat:51.4937, lon:0.0533, addr:'Woolwich, SE18',
      text:'Henry VIII founded Woolwich Dockyard in 1512 to build his flagship, the Henry Grace &agrave; Dieu. It went on to launch warships for the Royal Navy for over three centuries before closing in 1869, one of the oldest and longest-serving of England\'s royal dockyards.' },

    { id:'bon-scott-east-dulwich', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/67_Overhill_Road_East_Dulwich.JPG/330px-67_Overhill_Road_East_Dulwich.JPG', name:'Bon Scott', area:'East Dulwich', pc:'SE22', cat:'memory', year:1980, era:'Died 19 February 1980',
      lat:51.4455, lon:-0.0696, addr:'67 Overhill Road, SE22',
      text:'AC/DC frontman Bon Scott died on 19 February 1980 after a night out, found unresponsive in a car outside 67 Overhill Road in East Dulwich. His death, days before the band began recording what became Back in Black, remains one of rock music\'s most mourned losses.' },

    { id:'brockley-ladywell-cemetery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ladywell_and_Brockley_cemetery_-_geograph.org.uk_-_1290119.jpg/330px-Ladywell_and_Brockley_cemetery_-_geograph.org.uk_-_1290119.jpg', name:'Brockley and Ladywell Cemeteries', area:'Brockley', pc:'SE4', cat:'green', year:1858, era:'Opened 1858',
      lat:51.457, lon:-0.0311, addr:'Ivy Road, SE4',
      text:'Opened in 1858 as two adjoining Victorian cemeteries, Brockley and Ladywell Cemeteries became the resting place for tens of thousands of south Londoners. Today the site is also managed as a nature reserve, its older, overgrown sections left to grow wild among the gravestones.' },

    { id:'charles-stewart-parnell-brockley', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Charles_Stewart_Parnell_-_Brady-Handy.jpg/330px-Charles_Stewart_Parnell_-_Brady-Handy.jpg', name:'Charles Stewart Parnell', area:'Brockley', pc:'SE4', cat:'resident', year:1880, era:'Lived on Tressillian Road',
      lat:51.4623, lon:-0.0291, addr:'112 Tressillian Road, SE4',
      text:'The Irish nationalist leader Charles Stewart Parnell, who dominated Irish politics in the campaign for Home Rule until scandal ended his career in 1891, lived for a time at 112 Tressillian Road in Brockley.' },

    { id:'college-road-tollgate', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/The_College_Road_Tollgate_-_geograph.org.uk_-_5675890.jpg/330px-The_College_Road_Tollgate_-_geograph.org.uk_-_5675890.jpg', name:'College Road Tollgate', area:'Dulwich', pc:'SE21', cat:'grand', year:1789, era:'In operation since 1789',
      lat:51.4334, lon:-0.0792, addr:'College Road, SE21',
      text:'Established in 1789 to fund the upkeep of College Road, this tollgate is the last one still in daily operation on a public road anywhere in London, still collecting a toll from drivers who use the private road it guards.' },

    { id:'dulwich-picture-gallery', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Dulwich_Picture_Gallery%2C_Gallery_Road_-_geograph.org.uk_-_4229615.jpg/330px-Dulwich_Picture_Gallery%2C_Gallery_Road_-_geograph.org.uk_-_4229615.jpg', name:'Dulwich Picture Gallery', area:'Dulwich', pc:'SE21', cat:'culture', year:1814, era:'Built 1811&ndash;14',
      lat:51.446, lon:-0.0863, addr:'Gallery Road, SE21',
      text:'Designed by Sir John Soane and completed in 1814, Dulwich Picture Gallery is generally recognised as England\'s first purpose-built public art gallery. It was built to house a collection originally assembled for the King of Poland and also contains, at Soane\'s design, a mausoleum for the gallery\'s founders.' },

    { id:'edward-alleyn', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Edward_alleyn.jpg/330px-Edward_alleyn.jpg', name:'Edward Alleyn', area:'Dulwich', pc:'SE21', cat:'resident', year:1619, era:'Founded the College of God\'s Gift, 1619',
      lat:51.4386, lon:-0.0853, addr:'Dulwich College, SE21',
      text:'The Elizabethan actor and theatrical entrepreneur Edward Alleyn bought the Manor of Dulwich in 1605 with the fortune he made running the Rose and Fortune playhouses. In 1619 he founded the College of God\'s Gift here, a charitable foundation that grew into Dulwich College and endowed the wider estate that still shapes the area today.' },

    { id:'hilly-fields', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Stone_circle_on_Hilly_Fields_-_geograph.org.uk_-_2456768.jpg/330px-Stone_circle_on_Hilly_Fields_-_geograph.org.uk_-_2456768.jpg', name:'Hilly Fields', area:'Brockley', pc:'SE4', cat:'green', year:1896, era:'Saved from development and opened 1896',
      lat:51.46, lon:-0.0255, addr:'Hilly Fields, SE4',
      text:'Hilly Fields was saved from housing development by a local campaign in the 1880s and 90s and opened as a public park in 1896. Its high ground, once used for an anti-aircraft gun emplacement in the Second World War, still gives one of south-east London\'s best skyline views.' },

    { id:'royal-herbert-hospital', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/London%2C_Shooters_Hill%2C_Herbert_Hospital_03.jpg/330px-London%2C_Shooters_Hill%2C_Herbert_Hospital_03.jpg', name:'Royal Herbert Hospital', area:'Shooter\'s Hill', pc:'SE18', cat:'grand', year:1865, era:'Opened 1865',
      lat:51.4708, lon:0.0528, addr:'Shooter\'s Hill, SE18',
      text:'Built in the wake of the Crimean War and influenced by Florence Nightingale\'s ideas on hospital design and ventilation, the Royal Herbert Hospital opened in 1865 as a military hospital. Now Grade II listed and converted to housing, it was one of the first hospitals designed on the pavilion principle she championed.' },

    { id:'samuel-matthews-dulwich-hermit', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Samuel_Mathews%2C_a_hermit._Engraving_by_J._Greig%2C_1803%2C_after_Wellcome_V0007193.jpg/330px-Samuel_Mathews%2C_a_hermit._Engraving_by_J._Greig%2C_1803%2C_after_Wellcome_V0007193.jpg', name:'Samuel Matthews, the Dulwich Hermit', area:'Dulwich', pc:'SE21', cat:'memory', year:1803, era:'Murdered 1803',
      lat:51.4304, lon:-0.0774, addr:'Dulwich Wood, SE21',
      text:'Samuel Matthews lived alone in a hut in Dulwich Wood, earning a reputation locally as the \'Dulwich Hermit\'. He was murdered there in 1803, and his story survives as one of the area\'s stranger footnotes; he was buried in the Old Burial Ground on Dulwich Village.' },

    { id:'severndroog-castle', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/2016_Severndroog_Castle_02.jpg/330px-2016_Severndroog_Castle_02.jpg', name:'Severndroog Castle', area:'Shooter\'s Hill', pc:'SE18', cat:'grand', year:1784, era:'Built 1784',
      lat:51.4666, lon:0.06, addr:'Castle Wood, Shooter\'s Hill, SE18',
      text:'This triangular Gothic folly was built in 1784 by Lady James in memory of her husband, Commodore Sir William James, commemorating his 1755 storming of the pirate fortress of Suvarnadurg off the coast of India. Restored after decades of decay, it now houses a tea room with panoramic views across seven counties.' },

    { id:'john-stainer-brockley', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SirJohnStainer.JPG/330px-SirJohnStainer.JPG', name:'Sir John Stainer', area:'Brockley', pc:'SE4', cat:'resident', year:1840, era:'Composer, 1840&ndash;1901',
      lat:51.4578, lon:-0.0361, addr:'Brockley, SE4',
      text:'The composer and organist Sir John Stainer, best remembered for his oratorio The Crucifixion, a staple of English church choirs ever since, lived in Brockley during part of his career as organist of St Paul\'s Cathedral.' },

    { id:'the-bull-shooters-hill', img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Bull_public_house%2C_Shooters_Hill_-_geograph.org.uk_-_1133968.jpg/330px-The_Bull_public_house%2C_Shooters_Hill_-_geograph.org.uk_-_1133968.jpg', name:'The Bull', area:'Shooter\'s Hill', pc:'SE18', cat:'pub', year:1741, era:'A pub on this site since the 1740s',
      lat:51.4693, lon:0.0666, addr:'Shrewsbury Lane, SE18',
      text:'A sign on the wall records a public house standing on this corner since 1741, on what was then a notoriously dangerous stretch of the old Dover Road, a coaching route so plagued by highwaymen that it gave Shooter\'s Hill its name. The present Victorian building stands close to the Bronze Age burial mound known as Shrewsbury Barrow.' }
  ];
