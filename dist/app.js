const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const task2Sample = `In today's increasingly complex world, financial literacy has become an essential life skill. While some argue that money management should remain a family responsibility, I strongly believe schools should teach it because not every child receives this guidance at home and early education can prevent costly mistakes.

Firstly, schools can provide equal access to practical financial knowledge. Many parents manage money effectively, but others may lack either the confidence or time to explain budgeting, saving and debt. If financial education depends entirely on families, children from disadvantaged backgrounds are likely to fall further behind. A short, practical course could ensure that every student understands concepts such as interest rates, taxes and responsible borrowing.

Secondly, learning these skills early allows students to practise before the consequences become serious. Teenagers increasingly make online purchases and may have part-time income, yet they are also exposed to easy credit and persuasive advertising. Classroom activities, such as creating a monthly budget or comparing loan offers, could help them make thoughtful decisions. This would not only reduce personal debt in adulthood but also encourage long-term habits of saving.

Admittedly, schools already have crowded timetables. However, financial literacy does not need to be a separate academic subject. It can be integrated into mathematics or citizenship lessons through realistic projects. In this way, students gain useful skills without sacrificing core subjects.

In conclusion, schools are well placed to give all young people a fair foundation in managing money. Although families still play an important role, structured lessons would prepare students for financial independence and should therefore form part of a modern education.`;

const task1Sample = `The line graph compares the proportion of electricity generated from renewable sources in three regions between 2010 and 2025.

Overall, renewable energy expanded in all three regions. The most striking growth occurred in the North, which moved from last place to first, while the figure for the Coast rose more steadily.

In 2010, the Coast generated approximately 28% of its electricity from renewables, compared with 20% in the Central region and only 12% in the North. Coastal production then increased gradually, reaching 46% by 2025. The Central region followed a less consistent pattern: its share climbed to 34% in 2020 before levelling off at around 36%.

By contrast, the North recorded a sharp and sustained rise. Its proportion doubled to 24% in 2015, overtook the Central region five years later and peaked at 58% in the final year. Consequently, the gap between the strongest and weakest regions widened considerably by 2025.`;

const prompts = {
  task1: [
    { id: 'line', label: 'Line graph · Renewable electricity', text: 'The line graph below shows the percentage of electricity generated from renewable sources in three regions between 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'line' },
    { id: 'bar', label: 'Bar chart · Commuting choices', text: 'The bar chart below compares the main methods of travelling to work in two cities in 2012 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'bar' },
    { id: 'pie', label: 'Pie charts · Household spending', text: 'The charts below show how an average household in one country distributed its monthly expenditure in 2005 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'pie' },
    { id: 'table', label: 'Table · Graduate destinations', text: 'The table below presents the destinations of graduates from three faculties six months after graduation in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'table' },
    { id: 'process', label: 'Process · Green tea production', text: 'The diagram below illustrates how green tea is produced and prepared for retail. Summarise the information by selecting and reporting the main features.', visual: 'process' },
    { id: 'map', label: 'Maps · Riverside park redevelopment', text: 'The maps below show a riverside park in 2000 and after its redevelopment in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'map' },
    { id: 'line-population', label: 'Line graph · Urban population', text: 'The line graph below shows the percentage of people living in urban areas in three countries between 1990 and 2030. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'linePopulation' },
    { id: 'bar-library', label: 'Bar chart · Library visitors', text: 'The bar chart below compares the percentage of visitors to a public library in four age groups in 2010 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'barLibrary' },
    { id: 'pie-water', label: 'Pie charts · Household water use', text: 'The pie charts below show how water was used in an average household in one country in 1995 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'pieWater' },
    { id: 'table-rail', label: 'Table · Intercity rail services', text: 'The table below compares intercity rail services in four countries in terms of annual journeys, average journey time and ticket price. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'tableRail' },
    { id: 'process-aluminium', label: 'Process · Aluminium can recycling', text: 'The diagram below shows how used aluminium cans are recycled and returned to shops. Summarise the information by selecting and reporting the main features.', visual: 'processAluminium' },
    { id: 'map-coastal', label: 'Maps · Coastal town development', text: 'The maps below show a coastal town in 1990 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.', visual: 'mapCoastal' }
  ],
  task2: [
    { id: 'education', label: 'Education · Financial literacy', text: 'Some people believe that schools should teach children how to manage money. To what extent do you agree or disagree?' },
    { id: 'environment', label: 'Environment · Individual action', text: 'Some people think individual actions cannot improve the environment and only governments and large companies can make a difference. Discuss both views and give your own opinion.' },
    { id: 'technology', label: 'Technology · Artificial intelligence', text: 'Artificial intelligence is increasingly used in education. Do the advantages of this development outweigh the disadvantages?' },
    { id: 'health', label: 'Health · Preventive care', text: 'Governments should spend more money on preventing illness rather than treating it. To what extent do you agree or disagree?' },
    { id: 'work', label: 'Work · Four-day week', text: 'Some employers are introducing a four-day working week. What are the advantages and disadvantages of this development?' },
    { id: 'cities', label: 'Cities · Private cars', text: 'Traffic congestion is becoming worse in many cities. What are the main causes of this problem, and what measures could solve it?' },
    { id: 'education-online', label: 'Education · Online assessment', text: 'Some universities are replacing traditional examinations with online assessment. Do the advantages of this development outweigh the disadvantages?' },
    { id: 'environment-plastic', label: 'Environment · Plastic packaging', text: 'Governments should make companies responsible for reducing the amount of plastic packaging they produce. To what extent do you agree or disagree?' },
    { id: 'technology-privacy', label: 'Technology · Personal data', text: 'Many online services collect large amounts of personal data. Why is this a concern, and what measures could protect users?' },
    { id: 'health-sugar', label: 'Health · Sugary products', text: 'Some people believe that foods and drinks containing high levels of sugar should be taxed more heavily. Discuss both views and give your own opinion.' },
    { id: 'work-remote', label: 'Work · Remote employment', text: 'An increasing number of people now work from home. How has this affected employees and employers? Is this a positive or negative development?' },
    { id: 'cities-housing', label: 'Cities · High-rise housing', text: 'In many cities, high-rise apartments are replacing low-rise housing. What are the advantages and disadvantages of this change?' },
    { id: 'government-arts', label: 'Government · Arts funding', text: 'Some people think governments should reduce spending on the arts and invest more in public services. To what extent do you agree or disagree?' },
    { id: 'government-transport', label: 'Government · Public transport', text: 'Public transport should be free for everyone in order to reduce traffic congestion. Discuss both views and give your own opinion.' },
    { id: 'society-ageing', label: 'Society · Ageing population', text: 'In many countries, the proportion of older people is increasing. What problems can this cause, and what solutions can be introduced?' },
    { id: 'society-volunteering', label: 'Society · Community service', text: 'Some people believe that all young adults should be required to do unpaid community work. Do the benefits of this proposal outweigh the drawbacks?' },
    { id: 'crime-rehabilitation', label: 'Crime · Rehabilitation', text: 'Prison is the best way to punish people who commit serious crimes. Others believe rehabilitation is more effective. Discuss both views and give your own opinion.' },
    { id: 'crime-youth', label: 'Crime · Youth offending', text: 'Youth crime is increasing in some societies. What are the main causes, and how can young people be prevented from offending?' },
    { id: 'media-news', label: 'Media · Social news', text: 'More people now obtain news from social media rather than newspapers or television. Is this a positive or negative development?' },
    { id: 'media-advertising', label: 'Media · Advertising to children', text: 'Advertising aimed at children should be prohibited. To what extent do you agree or disagree?' },
    { id: 'global-culture', label: 'Globalisation · Local culture', text: 'The spread of global brands is causing countries to lose their cultural identity. To what extent do you agree or disagree?' },
    { id: 'global-business', label: 'Globalisation · Multinational companies', text: 'Multinational companies bring both benefits and problems to developing countries. Discuss the advantages and disadvantages.' },
    { id: 'family-free-time', label: 'Family · Children’s free time', text: 'Some parents organise every part of their children’s free time. Others believe children should decide for themselves how to use it. Discuss both views and give your own opinion.' },
    { id: 'tourism-heritage', label: 'Tourism · Historic sites', text: 'Many historic sites are visited mainly by tourists rather than local people. Why does this happen, and how can local residents be encouraged to visit?' }
  ]
};

const sourcePromptExpansion=window.RUBRICLAB_SOURCE_PROMPTS||{};
Object.entries(sourcePromptExpansion).forEach(([task,items])=>{
  if(prompts[task]&&Array.isArray(items)) prompts[task].push(...items);
});

function svgFrame(title, subtitle, body) {
  return `<svg viewBox="0 0 760 360" role="img" aria-label="${title}"><rect width="760" height="360" rx="18" fill="#fbfdfc"/><text x="380" y="32" text-anchor="middle" fill="#173d3b" font-size="18" font-weight="700">${title}</text><text x="380" y="53" text-anchor="middle" fill="#718986" font-size="10">${subtitle}</text>${body}<text x="380" y="342" text-anchor="middle" fill="#8aa09c" font-size="9">Original practice visual created for RubricLab</text></svg>`;
}

const visuals = {
  line: () => svgFrame('Renewable electricity generation', 'Share of total electricity (%)', `
    <g stroke="#dce8e5" stroke-width="1">${[0,1,2,3,4].map(i => `<line x1="78" y1="${290-i*52}" x2="700" y2="${290-i*52}"/>`).join('')}</g>
    <g fill="#718986" font-size="10">${[0,15,30,45,60].map((v,i)=>`<text x="62" y="${294-i*52}" text-anchor="end">${v}</text>`).join('')}${[2010,2015,2020,2025].map((v,i)=>`<text x="${100+i*190}" y="314" text-anchor="middle">${v}</text>`).join('')}</g>
    <polyline points="100,248 290,208 480,132 670,88" fill="none" stroke="#ef826d" stroke-width="4"/><polyline points="100,192 290,165 480,142 670,130" fill="none" stroke="#2b716b" stroke-width="4"/><polyline points="100,220 290,188 480,172 670,164" fill="none" stroke="#eab85b" stroke-width="4"/>
    <g fill="#ef826d">${[[100,248],[290,208],[480,132],[670,88]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5"/>`).join('')}</g><g fill="#2b716b">${[[100,192],[290,165],[480,142],[670,130]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5"/>`).join('')}</g><g fill="#eab85b">${[[100,220],[290,188],[480,172],[670,164]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5"/>`).join('')}</g>
    <g font-size="10"><circle cx="245" cy="75" r="5" fill="#ef826d"/><text x="255" y="79">North</text><circle cx="345" cy="75" r="5" fill="#2b716b"/><text x="355" y="79">Coast</text><circle cx="445" cy="75" r="5" fill="#eab85b"/><text x="455" y="79">Central</text></g>`),
  bar: () => svgFrame('Main methods of travelling to work', 'Percentage of commuters', `
    <g stroke="#dce8e5">${[0,1,2,3,4].map(i=>`<line x1="70" y1="${292-i*50}" x2="710" y2="${292-i*50}"/>`).join('')}</g>
    <g fill="#718986" font-size="10">${[0,15,30,45,60].map((v,i)=>`<text x="58" y="${296-i*50}" text-anchor="end">${v}</text>`).join('')}</g>
    ${[['Car',130,54,38],['Bus',265,22,31],['Bicycle',400,9,21],['Train',535,12,24],['Walk',670,18,16]].map(([label,x,a,b])=>`<rect x="${x-34}" y="${292-a*3.3}" width="30" height="${a*3.3}" rx="5" fill="#9cc9c4"/><rect x="${x+4}" y="${292-b*3.3}" width="30" height="${b*3.3}" rx="5" fill="#ef826d"/><text x="${x}" y="315" text-anchor="middle" font-size="10" fill="#385c59">${label}</text>`).join('')}
    <g font-size="10"><rect x="285" y="65" width="12" height="12" rx="3" fill="#9cc9c4"/><text x="302" y="75">2012</text><rect x="365" y="65" width="12" height="12" rx="3" fill="#ef826d"/><text x="382" y="75">2024</text></g>`),
  pie: () => svgFrame('Average monthly household expenditure', 'Percentage by category', `
    <g transform="translate(215 190) rotate(-90)"><circle r="92" fill="none" stroke="#2b716b" stroke-width="46" stroke-dasharray="97 289"/><circle r="92" fill="none" stroke="#ef826d" stroke-width="46" stroke-dasharray="72 289" stroke-dashoffset="-97"/><circle r="92" fill="none" stroke="#eab85b" stroke-width="46" stroke-dasharray="58 289" stroke-dashoffset="-169"/><circle r="92" fill="none" stroke="#8eb9d0" stroke-width="46" stroke-dasharray="43 289" stroke-dashoffset="-227"/><circle r="92" fill="none" stroke="#b7cfc9" stroke-width="46" stroke-dasharray="19 289" stroke-dashoffset="-270"/></g>
    <g transform="translate(545 190) rotate(-90)"><circle r="92" fill="none" stroke="#2b716b" stroke-width="46" stroke-dasharray="81 289"/><circle r="92" fill="none" stroke="#ef826d" stroke-width="46" stroke-dasharray="58 289" stroke-dashoffset="-81"/><circle r="92" fill="none" stroke="#eab85b" stroke-width="46" stroke-dasharray="46 289" stroke-dashoffset="-139"/><circle r="92" fill="none" stroke="#8eb9d0" stroke-width="46" stroke-dasharray="75 289" stroke-dashoffset="-185"/><circle r="92" fill="none" stroke="#b7cfc9" stroke-width="46" stroke-dasharray="29 289" stroke-dashoffset="-260"/></g>
    <text x="215" y="196" text-anchor="middle" font-size="18" font-weight="700">2005</text><text x="545" y="196" text-anchor="middle" font-size="18" font-weight="700">2025</text>
    <g font-size="9" fill="#385c59">${[['Housing','#2b716b'],['Food','#ef826d'],['Transport','#eab85b'],['Leisure','#8eb9d0'],['Other','#b7cfc9']].map((x,i)=>`<rect x="${205+i*75}" y="300" width="10" height="10" rx="2" fill="${x[1]}"/><text x="${219+i*75}" y="309">${x[0]}</text>`).join('')}</g>`),
  table: () => svgFrame('Graduate destinations after six months', 'Percent of graduates in 2025', `
    <g transform="translate(90 78)"><rect width="580" height="214" rx="12" fill="#fff" stroke="#cbded9"/><rect width="580" height="44" rx="12" fill="#174b49"/><g fill="#fff" font-size="11" font-weight="700"><text x="18" y="27">Faculty</text><text x="180" y="27">Full-time work</text><text x="320" y="27">Further study</text><text x="450" y="27">Other / seeking work</text></g>
    ${[['Engineering','72%','18%','10%'],['Business','64%','21%','15%'],['Arts','48%','32%','20%']].map((r,i)=>`<g transform="translate(0 ${44+i*56})"><rect width="580" height="56" fill="${i%2?'#f3f8f6':'#fffefa'}"/><text x="18" y="34" font-weight="700">${r[0]}</text><text x="215" y="34" text-anchor="middle">${r[1]}</text><text x="355" y="34" text-anchor="middle">${r[2]}</text><text x="500" y="34" text-anchor="middle">${r[3]}</text></g>`).join('')}</g>`),
  process: () => svgFrame('How green tea is produced', 'A six-stage linear process', `
    ${[['1','Leaves picked'],['2','Withered'],['3','Rolled'],['4','Heated'],['5','Dried'],['6','Packed']].map((x,i)=>{const px=70+i*113;return `<g transform="translate(${px} 150)"><circle cx="35" cy="35" r="34" fill="${i%2?'#f7dfaa':'#b9d9d3'}"/><text x="35" y="30" text-anchor="middle" font-size="11" font-weight="800" fill="#174b49">${x[0]}</text><text x="35" y="48" text-anchor="middle" font-size="9" fill="#174b49">${x[1]}</text></g>${i<5?`<path d="M${px+72} 185 H${px+105}" stroke="#ef826d" stroke-width="3"/><path d="M${px+100} 179 l8 6 -8 6" fill="none" stroke="#ef826d" stroke-width="3"/>`:''}`}).join('')}
    <g fill="#385c59" font-size="10"><text x="105" y="245" text-anchor="middle">fresh leaves</text><text x="331" y="245" text-anchor="middle">shape released</text><text x="557" y="245" text-anchor="middle">moisture removed</text></g>`),
  map: () => svgFrame('Riverside Park: before and after redevelopment', 'Site plan in 2000 and 2025', `
    <g transform="translate(70 85)"><text x="140" y="-12" text-anchor="middle" font-weight="700">2000</text><rect width="280" height="210" rx="12" fill="#dfeeed" stroke="#8bb1ab"/><path d="M0 165 Q70 135 140 168 T280 155 V210 H0Z" fill="#8eb9d0"/><rect x="28" y="25" width="80" height="48" rx="5" fill="#f7dfaa"/><text x="68" y="53" text-anchor="middle" font-size="9">Car park</text><circle cx="210" cy="60" r="38" fill="#8fb99e"/><text x="210" y="64" text-anchor="middle" font-size="9">Woodland</text><path d="M120 0 V150" stroke="#c09b6b" stroke-width="13"/><text x="140" y="112" font-size="9">Path</text></g>
    <g transform="translate(410 85)"><text x="140" y="-12" text-anchor="middle" font-weight="700">2025</text><rect width="280" height="210" rx="12" fill="#dfeeed" stroke="#8bb1ab"/><path d="M0 165 Q70 135 140 168 T280 155 V210 H0Z" fill="#8eb9d0"/><rect x="18" y="20" width="70" height="42" rx="5" fill="#f7dfaa"/><text x="53" y="45" text-anchor="middle" font-size="9">Car park</text><rect x="108" y="22" width="66" height="48" rx="9" fill="#efb09f"/><text x="141" y="50" text-anchor="middle" font-size="9">Café</text><circle cx="226" cy="53" r="30" fill="#8fb99e"/><text x="226" y="57" text-anchor="middle" font-size="9">Garden</text><rect x="185" y="96" width="62" height="40" rx="7" fill="#c7b3dc"/><text x="216" y="120" text-anchor="middle" font-size="9">Play area</text><path d="M92 0 V148 M92 105 H190" stroke="#c09b6b" stroke-width="11"/><path d="M5 145 H270" stroke="#ef826d" stroke-width="5" stroke-dasharray="9 5"/><text x="78" y="138" font-size="8">Cycle path</text></g>`),
  linePopulation: () => svgFrame('Population living in urban areas', 'Percentage of total population', `
    <g stroke="#dce8e5">${[0,1,2,3,4].map(i=>`<line x1="78" y1="${290-i*52}" x2="700" y2="${290-i*52}"/>`).join('')}</g>
    <g fill="#718986" font-size="10">${[0,20,40,60,80].map((v,i)=>`<text x="62" y="${294-i*52}" text-anchor="end">${v}</text>`).join('')}${[1990,2000,2010,2020,2030].map((v,i)=>`<text x="100" y="0"></text><text x="${100+i*142}" y="314" text-anchor="middle">${v}</text>`).join('')}</g>
    <polyline points="100,212 242,185 384,154 526,124 668,102" fill="none" stroke="#ef826d" stroke-width="4"/><polyline points="100,238 242,222 384,196 526,170 668,144" fill="none" stroke="#2b716b" stroke-width="4"/><polyline points="100,264 242,250 384,230 526,204 668,176" fill="none" stroke="#eab85b" stroke-width="4"/>
    <g font-size="10"><circle cx="260" cy="72" r="5" fill="#ef826d"/><text x="270" y="76">Arden</text><circle cx="365" cy="72" r="5" fill="#2b716b"/><text x="375" y="76">Belland</text><circle cx="480" cy="72" r="5" fill="#eab85b"/><text x="490" y="76">Coria</text></g>`),
  barLibrary: () => svgFrame('Visitors to a public library by age', 'Percentage of all visitors', `
    <g stroke="#dce8e5">${[0,1,2,3,4].map(i=>`<line x1="80" y1="${292-i*50}" x2="700" y2="${292-i*50}"/>`).join('')}</g>
    ${[['Under 18',150,34,23],['18–35',300,24,38],['36–55',450,28,25],['Over 55',600,14,14]].map(([label,x,a,b])=>`<rect x="${x-36}" y="${292-a*4}" width="30" height="${a*4}" rx="5" fill="#9cc9c4"/><rect x="${x+6}" y="${292-b*4}" width="30" height="${b*4}" rx="5" fill="#ef826d"/><text x="${x}" y="315" text-anchor="middle" font-size="10">${label}</text>`).join('')}
    <g font-size="10"><rect x="290" y="70" width="12" height="12" rx="3" fill="#9cc9c4"/><text x="308" y="80">2010</text><rect x="375" y="70" width="12" height="12" rx="3" fill="#ef826d"/><text x="393" y="80">2025</text></g>`),
  pieWater: () => svgFrame('Household water use', 'Percentage by purpose', `
    <g transform="translate(215 190) rotate(-90)"><circle r="92" fill="none" stroke="#2b716b" stroke-width="46" stroke-dasharray="101 289"/><circle r="92" fill="none" stroke="#ef826d" stroke-width="46" stroke-dasharray="78 289" stroke-dashoffset="-101"/><circle r="92" fill="none" stroke="#eab85b" stroke-width="46" stroke-dasharray="64 289" stroke-dashoffset="-179"/><circle r="92" fill="none" stroke="#8eb9d0" stroke-width="46" stroke-dasharray="46 289" stroke-dashoffset="-243"/></g>
    <g transform="translate(545 190) rotate(-90)"><circle r="92" fill="none" stroke="#2b716b" stroke-width="46" stroke-dasharray="81 289"/><circle r="92" fill="none" stroke="#ef826d" stroke-width="46" stroke-dasharray="98 289" stroke-dashoffset="-81"/><circle r="92" fill="none" stroke="#eab85b" stroke-width="46" stroke-dasharray="52 289" stroke-dashoffset="-179"/><circle r="92" fill="none" stroke="#8eb9d0" stroke-width="46" stroke-dasharray="58 289" stroke-dashoffset="-231"/></g>
    <text x="215" y="196" text-anchor="middle" font-size="18" font-weight="700">1995</text><text x="545" y="196" text-anchor="middle" font-size="18" font-weight="700">2025</text><g font-size="9">${[['Bathroom','#2b716b'],['Kitchen','#ef826d'],['Laundry','#eab85b'],['Garden','#8eb9d0']].map((x,i)=>`<rect x="220" y="${286+i*14}" width="10" height="10" rx="2" fill="${x[1]}"/><text x="236" y="${295+i*14}">${x[0]}</text>`).join('')}</g>`),
  tableRail: () => svgFrame('Intercity rail services', 'Annual journeys, duration and average one-way fare', `
    <g transform="translate(75 78)"><rect width="610" height="224" rx="12" fill="#fff" stroke="#cbded9"/><rect width="610" height="44" rx="12" fill="#174b49"/><g fill="#fff" font-size="10" font-weight="700"><text x="18" y="27">Country</text><text x="175" y="27">Journeys (m)</text><text x="325" y="27">Duration (min)</text><text x="475" y="27">Average fare ($)</text></g>${[['Aster','820','96','42'],['Brin','540','74','35'],['Canto','310','118','28'],['Doran','690','82','51']].map((row,i)=>`<g transform="translate(0 ${44+i*45})"><rect width="610" height="45" fill="${i%2?'#f3f8f6':'#fffefa'}"/><text x="18" y="28" font-weight="700">${row[0]}</text><text x="205" y="28" text-anchor="middle">${row[1]}</text><text x="365" y="28" text-anchor="middle">${row[2]}</text><text x="510" y="28" text-anchor="middle">${row[3]}</text></g>`).join('')}</g>`),
  processAluminium: () => svgFrame('Recycling aluminium cans', 'A seven-stage cyclical process', `
    ${[['1','Collected'],['2','Sorted'],['3','Crushed'],['4','Melted'],['5','Rolled'],['6','Made'],['7','Returned']].map((x,i)=>{const px=38+i*99;return `<g transform="translate(${px} 145)"><circle cx="34" cy="34" r="32" fill="${i%2?'#f7dfaa':'#b9d9d3'}"/><text x="34" y="30" text-anchor="middle" font-size="11" font-weight="800">${x[0]}</text><text x="34" y="47" text-anchor="middle" font-size="8">${x[1]}</text></g>${i<6?`<path d="M${px+68} 179 H${px+94}" stroke="#ef826d" stroke-width="3"/>`:''}`}).join('')}<path d="M690 217 Q380 290 72 217" fill="none" stroke="#2b716b" stroke-width="3" stroke-dasharray="8 6"/><text x="380" y="270" text-anchor="middle" font-size="10" fill="#385c59">used cans return to collection points</text>`),
  mapCoastal: () => svgFrame('Coastal town development', 'Land use in 1990 and 2025', `
    <g transform="translate(65 82)"><text x="145" y="-10" text-anchor="middle" font-weight="700">1990</text><rect width="290" height="215" rx="12" fill="#dfeeed" stroke="#8bb1ab"/><path d="M0 170 Q75 145 145 170 T290 160 V215 H0Z" fill="#8eb9d0"/><rect x="24" y="30" width="76" height="50" rx="6" fill="#f7dfaa"/><text x="62" y="59" text-anchor="middle" font-size="9">Fishing huts</text><rect x="175" y="22" width="80" height="55" rx="6" fill="#b7cfc9"/><text x="215" y="53" text-anchor="middle" font-size="9">Farmland</text><path d="M135 0 V160" stroke="#c09b6b" stroke-width="12"/><text x="151" y="110" font-size="9">Road</text></g>
    <g transform="translate(405 82)"><text x="145" y="-10" text-anchor="middle" font-weight="700">2025</text><rect width="290" height="215" rx="12" fill="#dfeeed" stroke="#8bb1ab"/><path d="M0 170 Q75 145 145 170 T290 160 V215 H0Z" fill="#8eb9d0"/><rect x="18" y="22" width="78" height="58" rx="7" fill="#efb09f"/><text x="57" y="54" text-anchor="middle" font-size="9">Hotel</text><rect x="165" y="18" width="96" height="65" rx="7" fill="#c7b3dc"/><text x="213" y="54" text-anchor="middle" font-size="9">Apartments</text><rect x="175" y="105" width="78" height="38" rx="7" fill="#f7dfaa"/><text x="214" y="128" text-anchor="middle" font-size="9">Shops</text><path d="M128 0 V160 M128 112 H175" stroke="#c09b6b" stroke-width="12"/><path d="M12 148 H270" stroke="#ef826d" stroke-width="5" stroke-dasharray="9 5"/><text x="72" y="140" font-size="8">Promenade</text></g>`)
};

function sourceBarVisual(c){
  const all=c.series.flatMap(s=>s.values), max=Math.max(...all), top=Math.ceil(max/10)*10;
  const left=74, base=292, width=630, height=190, group=width/c.categories.length, bar=Math.min(24,(group-16)/c.series.length);
  const grid=[0,.25,.5,.75,1].map(f=>`<line x1="${left}" y1="${base-height*f}" x2="${left+width}" y2="${base-height*f}"/><text x="${left-12}" y="${base-height*f+4}" text-anchor="end" fill="#718986" stroke="none" font-size="9">${Math.round(top*f)}</text>`).join('');
  const bars=c.categories.map((label,i)=>{const start=left+i*group+(group-c.series.length*bar)/2;return c.series.map((s,j)=>{const h=s.values[i]/top*height;return `<rect x="${start+j*bar}" y="${base-h}" width="${bar-3}" height="${h}" rx="4" fill="${s.color}"/>`;}).join('')+`<text x="${left+i*group+group/2}" y="312" text-anchor="middle" font-size="9" fill="#385c59">${label}</text>`;}).join('');
  const legend=c.series.map((s,i)=>`<rect x="${230+i*110}" y="67" width="11" height="11" rx="3" fill="${s.color}"/><text x="${246+i*110}" y="76" font-size="9">${s.name}</text>`).join('');
  return svgFrame(c.title,c.subtitle,`<g stroke="#dce8e5">${grid}</g>${bars}${legend}`);
}

function sourceLineVisual(c){
  const all=c.series.flatMap(s=>s.values), max=Math.max(...all), min=Math.min(0,...all), top=Math.ceil(max/10)*10||Math.ceil(max), left=82, base=292, width=600, height=190;
  const x=i=>left+i*(width/(c.years.length-1)), y=v=>base-(v-min)/(top-min)*height;
  const grid=[0,.25,.5,.75,1].map(f=>`<line x1="${left}" y1="${base-height*f}" x2="${left+width}" y2="${base-height*f}"/><text x="${left-12}" y="${base-height*f+4}" text-anchor="end" fill="#718986" stroke="none" font-size="9">${(min+(top-min)*f).toFixed(top<=10?1:0)}</text>`).join('');
  const lines=c.series.map(s=>`<polyline points="${s.values.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="${s.color}" stroke-width="4"/>${s.values.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="${s.color}"/>`).join('')}`).join('');
  const years=c.years.map((v,i)=>`<text x="${x(i)}" y="314" text-anchor="middle" font-size="9" fill="#385c59">${v}</text>`).join('');
  const legend=c.series.map((s,i)=>`<circle cx="${205+i*120}" cy="72" r="5" fill="${s.color}"/><text x="${216+i*120}" y="76" font-size="9">${s.name}</text>`).join('');
  return svgFrame(c.title,c.subtitle,`<g stroke="#dce8e5">${grid}</g>${lines}${years}${legend}`);
}

function sourceTableVisual(c){
  const x=70,y=78,w=620,rowH=46,colW=w/c.headers.length;
  const head=c.headers.map((h,i)=>`<text x="${i*colW+14}" y="28" fill="white" font-size="10" font-weight="700">${h}</text>`).join('');
  const rows=c.rows.map((row,r)=>`<g transform="translate(0 ${44+r*rowH})"><rect width="${w}" height="${rowH}" fill="${r%2?'#f3f8f6':'#fffefa'}"/>${row.map((v,i)=>`<text x="${i*colW+14}" y="29" font-size="10" ${i===0?'font-weight="700"':''}>${v}</text>`).join('')}</g>`).join('');
  return svgFrame(c.title,c.subtitle,`<g transform="translate(${x} ${y})"><rect width="${w}" height="${44+c.rows.length*rowH}" rx="12" fill="#fff" stroke="#cbded9"/><rect width="${w}" height="44" rx="12" fill="#174b49"/>${head}${rows}</g>`);
}

function donut(cx,cy,values,labels,label){
  const colors=['#2b716b','#ef826d','#eab85b','#8eb9d0','#b7cfc9'],circ=289;
  let offset=0; const rings=values.map((v,i)=>{const dash=v/100*circ, part=`<circle cx="${cx}" cy="${cy}" r="92" fill="none" stroke="${colors[i]}" stroke-width="42" stroke-dasharray="${dash} ${circ-dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"/>`;offset+=dash;return part;}).join('');
  return `${rings}<text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="16" font-weight="700">${label}</text>`;
}

function sourcePieVisual(c){
  const colors=['#2b716b','#ef826d','#eab85b','#8eb9d0','#b7cfc9'];
  const legend=c.labels.map((label,i)=>`<rect x="${185+i*92}" y="305" width="10" height="10" rx="2" fill="${colors[i]}"/><text x="${199+i*92}" y="314" font-size="8">${label}</text>`).join('');
  return svgFrame(c.title,c.subtitle,`${donut(220,185,c.left,c.labels,c.leftLabel)}${donut(540,185,c.right,c.labels,c.rightLabel)}${legend}`);
}

function sourceProcessVisual(c){
  const group=650/c.stages.length;
  const stages=c.stages.map((name,i)=>{const x=55+i*group;return `<g transform="translate(${x} 145)"><circle cx="32" cy="32" r="31" fill="${i%2?'#f7dfaa':'#b9d9d3'}"/><text x="32" y="29" text-anchor="middle" font-size="10" font-weight="800">${i+1}</text><text x="32" y="45" text-anchor="middle" font-size="7.5">${name}</text></g>${i<c.stages.length-1?`<path d="M${x+66} 177 H${x+group-4}" stroke="#ef826d" stroke-width="3"/>`:''}`;}).join('');
  return svgFrame(c.title,c.subtitle,`${stages}<path d="M670 222 Q380 294 88 222" fill="none" stroke="#2b716b" stroke-width="2" stroke-dasharray="7 6"/><text x="380" y="274" text-anchor="middle" font-size="9" fill="#385c59">collection, treatment and reuse</text>`);
}

function sourceMapVisual(c){
  const panel=(x,label,features,after)=>`<g transform="translate(${x} 82)"><text x="145" y="-10" text-anchor="middle" font-weight="700">${label}</text><rect width="290" height="215" rx="12" fill="#dfeeed" stroke="#8bb1ab"/><path d="M0 170 Q72 145 145 170 T290 158 V215 H0Z" fill="#8eb9d0"/><path d="M138 0 V158 ${after?'M138 108 H258':''}" stroke="#c09b6b" stroke-width="11"/>${features.map((f,i)=>{const pos=[[20,25],[178,22],[22,100],[180,103]][i%4];return `<rect x="${pos[0]}" y="${pos[1]}" width="88" height="42" rx="7" fill="${['#f7dfaa','#b7cfc9','#efb09f','#c7b3dc'][i%4]}"/><text x="${pos[0]+44}" y="${pos[1]+25}" text-anchor="middle" font-size="8">${f}</text>`;}).join('')}</g>`;
  return svgFrame(c.title,c.subtitle,`${panel(65,'Before / present',c.before,false)}${panel(405,'After / proposed',c.after,true)}`);
}

function sourceMixedVisual(c){
  const colors=['#2b716b','#ef826d','#eab85b'];
  const legend=c.labels.map((l,i)=>`<rect x="${145+i*105}" y="292" width="10" height="10" rx="2" fill="${colors[i]}"/><text x="${159+i*105}" y="301" font-size="8">${l}</text>`).join('');
  const bars=c.districts.map((row,r)=>row.slice(1).map((v,i)=>`<rect x="${405+r*92+i*20}" y="${270-v*2.5}" width="16" height="${v*2.5}" rx="3" fill="${colors[i]}"/>`).join('')+`<text x="${430+r*92}" y="286" text-anchor="middle" font-size="8">${row[0]}</text>`).join('');
  return svgFrame(c.title,c.subtitle,`${donut(220,180,c.shares,c.labels,'Sources')}${bars}${legend}<text x="535" y="85" text-anchor="middle" font-size="10" font-weight="700">Sector / group comparison</text>`);
}

function renderSourceVisual(config){
  return ({bar:sourceBarVisual,line:sourceLineVisual,table:sourceTableVisual,pie:sourcePieVisual,process:sourceProcessVisual,map:sourceMapVisual,mixed:sourceMixedVisual})[config.type](config);
}

Object.entries(window.RUBRICLAB_SOURCE_VISUALS||{}).forEach(([key,config])=>{visuals[key]=()=>renderSourceVisual(config);});

const rubricCopy = {
  TR: { title: 'Clear position; develop one idea further.', good: 'Your response addresses the task and maintains a consistent central position.', improve: 'Add one specific consequence after the shortest supporting point so that it is fully developed.' },
  CC: { title: 'Logical progression with controlled linking.', good: 'Paragraphs have clear purposes and ideas generally move in a logical order.', improve: 'Use referencing words where possible instead of beginning several sentences with linking adverbs.' },
  LR: { title: 'Mostly precise vocabulary with useful collocations.', good: 'Topic vocabulary is used naturally and repetition is generally controlled.', improve: 'Replace one broad phrase with a topic-specific noun-and-verb combination.' },
  GRA: { title: 'Good range; long sentences need tighter control.', good: 'The response combines simple and complex structures with generally accurate punctuation.', improve: 'Split the longest sentence or reduce the number of dependent clauses before the main point.' }
};

let writingState = { task: 'task2', promptIndex: 0, scores: { TR: 7, CC: 7, LR: 7, GRA: 6.5 }, activeCriterion: 'TR' };
let autosaveTimer;
let writingComments = loadComments();
let inlineAnnotations = loadInlineAnnotations();
let savedEssaySelection = null;
let activeAnnotationId = null;

function loadComments(){
  try { const value=JSON.parse(localStorage.getItem('rubriclab-writing-comments')||'[]'); return Array.isArray(value)?value:[]; }
  catch { return []; }
}
function saveComments(){ localStorage.setItem('rubriclab-writing-comments',JSON.stringify(writingComments)); }
function currentPromptKey(){ return `${writingState.task}:${prompts[writingState.task][writingState.promptIndex].id}`; }
function escapeHtml(value){ return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }

function loadInlineAnnotations(){
  try { const value=JSON.parse(localStorage.getItem('rubriclab-inline-annotations')||'[]'); return Array.isArray(value)?value:[]; }
  catch { return []; }
}
function saveInlineAnnotations(){ localStorage.setItem('rubriclab-inline-annotations',JSON.stringify(inlineAnnotations)); }
function annotationsForPrompt(){ return inlineAnnotations.filter(item=>item.promptKey===currentPromptKey()).sort((a,b)=>a.start-b.start); }
function annotationOverlaps(start,end,ignoreId=''){ return annotationsForPrompt().some(item=>item.id!==ignoreId && start<item.end && end>item.start); }

function selectionOffsets(root,range){
  if(!range || !root.contains(range.commonAncestorContainer)) return null;
  const before=range.cloneRange(); before.selectNodeContents(root); before.setEnd(range.startContainer,range.startOffset);
  const start=before.toString().length; const text=range.toString();
  return text.trim()?{start,end:start+text.length,text}:null;
}

function captureEssaySelection(){
  const selection=window.getSelection();
  if(!selection || !selection.rangeCount) return;
  const offsets=selectionOffsets($('#essay'),selection.getRangeAt(0));
  if(offsets) savedEssaySelection=offsets;
}

function addSelectionAnnotation(type){
  const selection=savedEssaySelection;
  if(!selection){ showToast('Select part of your writing first'); $('#essay').focus(); return; }
  if(annotationOverlaps(selection.start,selection.end)){ showToast('This text already has a comment'); return; }
  const input=$('#annotation-comment');
  const fallback=type==='strong'?'Strong sentence: the idea is clear and well controlled.':'Revise this sentence for clearer, more precise language.';
  inlineAnnotations.push({id:`note-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,promptKey:currentPromptKey(),start:selection.start,end:selection.end,type,comment:input.value.trim()||fallback,createdAt:Date.now(),auto:false});
  input.value=''; savedEssaySelection=null; saveInlineAnnotations(); renderEditorAnnotations(); showToast(type==='strong'?'Strong writing highlighted':'Revision comment added');
}

function syncAnnotationOffsetsFromDom(){
  const editor=$('#essay'); const key=currentPromptKey(); const spans=[...editor.querySelectorAll('[data-annotation-id]')];
  if(!spans.length){
    if(annotationsForPrompt().length){ inlineAnnotations=inlineAnnotations.filter(item=>item.promptKey!==key); saveInlineAnnotations(); renderAnnotationRail(); }
    return;
  }
  const visible=new Set();
  spans.forEach(span=>{
    const id=span.dataset.annotationId; visible.add(id);
    const range=document.createRange(); range.selectNodeContents(span);
    const offsets=selectionOffsets(editor,range); const item=inlineAnnotations.find(note=>note.id===id);
    if(item && offsets){ item.start=offsets.start; item.end=offsets.end; }
  });
  inlineAnnotations=inlineAnnotations.filter(item=>item.promptKey!==key || visible.has(item.id)); saveInlineAnnotations();
}

function focusAnnotation(id){
  activeAnnotationId=id;
  $$('[data-annotation-id]').forEach(node=>node.classList.toggle('active',node.dataset.annotationId===id));
  $$('[data-annotation-card]').forEach(node=>node.classList.toggle('active',node.dataset.annotationCard===id));
}

function positionAnnotationCards(){
  const rail=$('#annotation-rail'); const editor=$('#essay'); if(!rail || !editor || innerWidth<=760) return;
  let nextTop=0;
  $$('[data-annotation-card]',rail).forEach(card=>{
    const highlight=editor.querySelector(`[data-annotation-id="${card.dataset.annotationCard}"]`);
    const desired=highlight?Math.max(0,highlight.offsetTop-8):nextTop;
    const top=Math.max(desired,nextTop); card.style.top=`${top}px`; nextTop=top+card.offsetHeight+10;
  });
  rail.style.minHeight=`${Math.max(editor.offsetHeight,nextTop+8)}px`;
}

function renderAnnotationRail(){
  const rail=$('#annotation-rail'); if(!rail) return;
  const items=annotationsForPrompt();
  if(!items.length) rail.style.minHeight='';
  rail.innerHTML=items.length?items.map(item=>`<article id="annotation-card-${item.id}" class="annotation-card ${item.type} ${item.id===activeAnnotationId?'active':''}" data-annotation-card="${item.id}" tabindex="0"><div><span>${item.type==='strong'?'Strong sentence':'Needs revision'}</span>${item.auto?'<small>Rubric review</small>':'<small>Your comment</small>'}</div><p>${escapeHtml(item.comment)}</p><button type="button" data-remove-annotation="${item.id}" aria-label="Remove this inline comment">Remove</button></article>`).join(''):'<div class="annotation-empty">Comments will appear beside the highlighted text.</div>';
  $$('[data-annotation-card]',rail).forEach(card=>{card.addEventListener('click',()=>focusAnnotation(card.dataset.annotationCard));card.addEventListener('focus',()=>focusAnnotation(card.dataset.annotationCard));});
  $$('[data-remove-annotation]',rail).forEach(button=>button.addEventListener('click',event=>{event.stopPropagation();inlineAnnotations=inlineAnnotations.filter(item=>item.id!==button.dataset.removeAnnotation);saveInlineAnnotations();renderEditorAnnotations();showToast('Inline comment removed');}));
  requestAnimationFrame(positionAnnotationCards);
}

function renderEditorAnnotations(){
  const editor=$('#essay'); if(!editor) return;
  const text=editor.value; const items=annotationsForPrompt().filter(item=>item.start>=0 && item.end<=text.length && item.end>item.start);
  let cursor=0; const rendered=[]; let html='';
  items.forEach(item=>{
    if(item.start<cursor) return;
    html+=escapeHtml(text.slice(cursor,item.start));
    html+=`<span class="inline-annotation ${item.type} ${item.id===activeAnnotationId?'active':''}" data-annotation-id="${item.id}" tabindex="0" aria-describedby="annotation-card-${item.id}">${escapeHtml(text.slice(item.start,item.end))}</span>`;
    cursor=item.end; rendered.push(item.id);
  });
  html+=escapeHtml(text.slice(cursor)); editor.innerHTML=html;
  $$('[data-annotation-id]',editor).forEach(span=>{span.addEventListener('click',()=>focusAnnotation(span.dataset.annotationId));span.addEventListener('focus',()=>focusAnnotation(span.dataset.annotationId));});
  renderAnnotationRail();
}

function sentenceRanges(text){ return [...text.matchAll(/[^.!?]+(?:[.!?]+|$)/g)].map(match=>({start:match.index,end:match.index+match[0].length,text:match[0],words:words(match[0])})).filter(item=>item.words>=5); }

function generateAutoAnnotations(){
  const text=$('#essay').value; const key=currentPromptKey(); const manual=annotationsForPrompt().filter(item=>!item.auto);
  inlineAnnotations=inlineAnnotations.filter(item=>item.promptKey!==key || !item.auto);
  const ranges=sentenceRanges(text).filter(range=>!manual.some(note=>range.start<note.end && range.end>note.start));
  if(!ranges.length){ saveInlineAnnotations(); renderEditorAnnotations(); return; }
  const strong=ranges.find(item=>item.words>=10 && item.words<=34 && /\b(overall|however|because|while|whereas|therefore|although|in conclusion)\b/i.test(item.text)) || ranges.find(item=>item.words>=10 && item.words<=28) || ranges[0];
  const alternatives=ranges.filter(item=>item!==strong); const issue=alternatives.sort((a,b)=>b.words-a.words)[0];
  inlineAnnotations.push({id:`auto-strong-${Date.now()}`,promptKey:key,start:strong.start,end:strong.end,type:'strong',comment:'This sentence communicates a clear idea with controlled academic language.',createdAt:Date.now(),auto:true});
  if(issue){
    const broad=/\b(things?|a lot|good|bad|useful skills?)\b/i.test(issue.text);
    const comment=broad?'Replace the broad wording with a more precise academic phrase.':issue.words>32?'This sentence is long. Split it or reduce the number of clauses.':'Make the relationship between this idea and the paragraph claim more explicit.';
    inlineAnnotations.push({id:`auto-revision-${Date.now()}`,promptKey:key,start:issue.start,end:issue.end,type:'revision',comment,createdAt:Date.now()+1,auto:true});
  }
  saveInlineAnnotations(); renderEditorAnnotations();
}

function setFeedbackTab(tab){
  const comments=tab==='comments';
  $('#rubric-panel').hidden=comments; $('#comments-panel').hidden=!comments;
  $$('[data-feedback-tab]').forEach(button=>{const active=button.dataset.feedbackTab===tab;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));});
  if(comments) renderComments();
}

function renderComments(){
  const key=currentPromptKey(); const items=writingComments.filter(item=>item.promptKey===key).sort((a,b)=>b.createdAt-a.createdAt);
  $('#comment-count').textContent=items.length;
  $('#comment-list').innerHTML=items.length?items.map(item=>`<article class="comment-item"><p>${escapeHtml(item.text)}</p><footer><time datetime="${new Date(item.createdAt).toISOString()}">${new Date(item.createdAt).toLocaleString([],{dateStyle:'medium',timeStyle:'short'})}</time><button type="button" data-remove-comment="${item.id}" aria-label="Remove this comment">Remove</button></footer></article>`).join(''):`<div class="comments-empty">No comments for this prompt yet.<br />Add one useful note for the next draft.</div>`;
  $$('[data-remove-comment]').forEach(button=>button.addEventListener('click',()=>{writingComments=writingComments.filter(item=>item.id!==button.dataset.removeComment);saveComments();renderComments();showToast('Comment removed');}));
}

function words(text) { return (text.trim().match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || []).length; }
function paragraphs(text) { return text.trim() ? text.trim().split(/\n\s*\n/).filter(Boolean).length : 0; }
function clampBand(value) { return Math.max(4.5, Math.min(8.5, Math.round(value * 2) / 2)); }

function setPromptOptions() {
  const list = prompts[writingState.task];
  $('#prompt-library-title').textContent = `${list.length} ${writingState.task === 'task1' ? 'Academic Task 1' : 'Task 2'} prompts`;
  $('#prompt-library-count').textContent = writingState.task === 'task1' ? 'Every prompt includes an original visual' : 'Choose a topic to start writing';
  $('#prompt-list').innerHTML = list.map((p,i)=>{
    const parts=p.label.split(' · '); const category=parts[0]; const title=parts.slice(1).join(' · ');
    const meta=p.source?`Adapted from ${p.source}`:(writingState.task==='task1'?'Visual included':'IELTS essay question');
    return `<button type="button" class="prompt-card ${i===writingState.promptIndex?'active':''}" data-prompt-index="${i}" role="listitem" aria-pressed="${i===writingState.promptIndex}"><span>${category}</span><strong>${title}</strong><small>${meta}</small></button>`;
  }).join('');
  $$('.prompt-card').forEach(card=>card.addEventListener('click',()=>selectPrompt(Number(card.dataset.promptIndex))));
  renderPrompt();
}

function selectPrompt(index) {
  const total=prompts[writingState.task].length;
  writingState.promptIndex=(index+total)%total;
  setPromptOptions();
  const active=$('.prompt-card.active');
  if(active) active.scrollIntoView({block:'nearest',inline:'nearest'});
}

function renderPrompt() {
  const item = prompts[writingState.task][writingState.promptIndex];
  activeAnnotationId = null;
  $('#prompt-title').textContent = item.label;
  $('#prompt-position').textContent = `Prompt ${writingState.promptIndex+1} of ${prompts[writingState.task].length}`;
  $('#prompt').textContent = item.text;
  $('#prompt-source').innerHTML=item.source?`<span>Adapted practice format</span><a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">${item.source}</a><small>Question wording and Task 1 visuals are original to RubricLab.</small>`:`<span>RubricLab original prompt</span><small>Created for independent IELTS Writing practice.</small>`;
  const visual = $('#task-visual');
  if (writingState.task === 'task1') { visual.hidden = false; visual.innerHTML = visuals[item.visual](); }
  else { visual.hidden = true; visual.innerHTML = ''; }
  $('#tr-label').textContent = writingState.task === 'task1' ? 'Task Achievement' : 'Task Response';
  renderComments();
  renderEditorAnnotations();
  updateStats();
}

function updateStats() {
  const text = $('#essay').value;
  const count = words(text);
  $('#word-count').textContent = count;
  $('#paragraph-count').textContent = paragraphs(text);
  const minimum = writingState.task === 'task1' ? 150 : 250;
  const target = $('#word-target');
  if (!count) { target.textContent = `Minimum ${minimum} words`; target.className = 'status-warn'; }
  else if (count < minimum) { target.textContent = `${minimum-count} words below minimum`; target.className = 'status-warn'; }
  else { target.textContent = 'On target'; target.className = 'status-good'; }
}

function calculateScores() {
  const text = $('#essay').value;
  const count = words(text);
  const para = paragraphs(text);
  const minimum = writingState.task === 'task1' ? 150 : 250;
  const lower = text.toLowerCase();
  const connectors = (lower.match(/\b(however|although|whereas|therefore|consequently|while|by contrast|overall|in conclusion)\b/g)||[]).length;
  const precise = (lower.match(/\b(proportion|approximately|respectively|significant|sustainable|incentive|congestion|curriculum|expenditure|account for)\b/g)||[]).length;
  const complexity = (text.match(/[,:;]/g)||[]).length;
  const overview = writingState.task === 'task1' ? /\boverall\b/i.test(text) : /\b(in conclusion|overall)\b/i.test(text);
  const base = 5.5 + Math.min(count/minimum,1)*.8;
  writingState.scores = {
    TR: clampBand(base + (para >= (writingState.task==='task1'?3:4) ? .35:0) + (overview?.35:0)),
    CC: clampBand(5.7 + Math.min(para,5)*.15 + Math.min(connectors,6)*.08),
    LR: clampBand(5.8 + Math.min(precise,7)*.14 + (count >= minimum ? .25:0)),
    GRA: clampBand(5.8 + Math.min(complexity,16)*.045 + (count >= minimum ? .2:0))
  };
}

function renderScores() {
  const s = writingState.scores;
  const overall = clampBand((s.TR+s.CC+s.LR+s.GRA)/4);
  $('#overall-score').textContent = overall.toFixed(1);
  $('#score-tr').textContent = s.TR.toFixed(1); $('#score-cc').textContent = s.CC.toFixed(1); $('#score-lr').textContent = s.LR.toFixed(1); $('#score-gra').textContent = s.GRA.toFixed(1);
  renderRadar();
  renderCriterion(writingState.activeCriterion);
  renderActions();
}

function renderRadar(){
  const s=writingState.scores; const values=[s.TR,s.CC,s.LR,s.GRA]; const labels=[writingState.task==='task1'?'TA':'TR','CC','LR','GRA'];
  const cx=90,cy=90,radius=55; const point=(value,index)=>{const angle=(-90+index*90)*Math.PI/180;const r=radius*(value/9);return `${(cx+Math.cos(angle)*r).toFixed(1)},${(cy+Math.sin(angle)*r).toFixed(1)}`;};
  const grid=[1,3,5,7,9].map(level=>`<polygon points="${[0,1,2,3].map(index=>point(level,index)).join(' ')}" />`).join('');
  const axes=[0,1,2,3].map(index=>`<line x1="${cx}" y1="${cy}" x2="${point(9,index).split(',')[0]}" y2="${point(9,index).split(',')[1]}" />`).join('');
  const labelsSvg=[`<text x="90" y="17" text-anchor="middle">${labels[0]}</text>`,`<text x="164" y="94" text-anchor="middle">${labels[1]}</text>`,`<text x="90" y="171" text-anchor="middle">${labels[2]}</text>`,`<text x="16" y="94" text-anchor="middle">${labels[3]}</text>`].join('');
  const chart=$('#rubric-radar');
  chart.setAttribute('aria-label',`${labels[0]} ${s.TR.toFixed(1)}, CC ${s.CC.toFixed(1)}, LR ${s.LR.toFixed(1)}, GRA ${s.GRA.toFixed(1)}`);
  chart.innerHTML=`<svg viewBox="0 0 180 180" aria-hidden="true"><g class="radar-grid">${grid}${axes}</g><polygon class="radar-score" points="${values.map(point).join(' ')}"/><g class="radar-dots">${values.map((value,index)=>{const [x,y]=point(value,index).split(',');return `<circle cx="${x}" cy="${y}" r="3.5"/>`;}).join('')}</g><g class="radar-labels">${labelsSvg}</g></svg>`;
}

function renderCriterion(code) {
  writingState.activeCriterion = code;
  $$('.score-row').forEach(x=>x.classList.toggle('active',x.dataset.criterion===code));
  const c = rubricCopy[code];
  const label = code==='TR' && writingState.task==='task1' ? 'Task achievement' : ({TR:'Task response',CC:'Coherence & cohesion',LR:'Lexical resource',GRA:'Grammar'}[code]);
  $('#criterion-detail').innerHTML = `<div class="detail-title"><span class="pill">${label}</span><span class="band-chip">Band ${writingState.scores[code].toFixed(1)}</span></div><h3>${c.title}</h3><p>✓ ${c.good}</p><div class="evidence-line"><strong>Next improvement</strong><span>${c.improve}</span></div>`;
}

function renderActions() {
  const actionData = [
    ['Highest impact','Develop the shortest idea','Add a cause, mechanism or consequence rather than another general claim.'],
    ['Lexical control','Build a precise word partnership','Choose a natural verb + noun collocation from the Library and adapt it to this topic.'],
    ['Accuracy check','Audit one long sentence','Find the longest sentence and check its subject, verb, punctuation and clause boundaries.']
  ];
  $('#action-grid').innerHTML = actionData.map(x=>`<article class="action-card"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('');
}

function showToast(message) { const t=$('#toast'); t.textContent=message; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200); }

function switchTask(task) {
  writingState.task = task; writingState.promptIndex = 0;
  $$('.segment').forEach(x=>x.classList.toggle('active',x.dataset.task===task));
  const saved = localStorage.getItem(`rubriclab-${task}-draft`);
  $('#essay').value = saved || (task==='task1' ? task1Sample : task2Sample);
  setPromptOptions(); calculateScores(); renderScores();
}

/* Library */
const E = (term,kind,band,pattern,example,note) => ({term,kind,band,pattern,example,note});
const library = {
  task1: [
    {id:'line',icon:'↗',title:'Line graphs',short:'Trends over time',description:'Describe direction, pace, peaks, lows and periods of stability without listing every data point.',entries:[
      E('rise steadily','Verb pattern','5-6','rise + adverb + from/to','The figure rose steadily from 18% in 2012 to 31% in 2020.','Use “by” for the size of a change and “to” for the final value.'),
      E('a sharp decline','Noun','6-7','a/an + adjective + change noun + in','A sharp decline in bus use occurred after 2018.','The noun form normally requires “in”: a decline in demand.'),
      E('level off at','Collocation','7-8','level off at + figure','After reaching 62%, the rate levelled off at just under two thirds.','Use when movement stops and becomes stable.'),
      E('fluctuate','Vocabulary','6-7','fluctuate between A and B','Oil prices fluctuated between $60 and $75 per barrel.','Name the range whenever it is visible.'),
      E('reach a peak of','Collocation','6-7','reach a peak of + number','Visitor numbers reached a peak of 1.8 million in August.','Peak is the highest point, not simply a high number.') ]},
    {id:'charts',icon:'▥',title:'Bar, pie & tables',short:'Static comparisons',description:'Compare categories, rank values and describe proportions precisely.',entries:[
      E('account for','Verb pattern','6-7','X accounts for + proportion','Housing accounted for nearly one third of total spending.','The subject is the category; the object is its share.'),
      E('the largest proportion','Noun','5-6','the largest/smallest proportion of','Cars represented the largest proportion of journeys in both cities.','Useful for overview statements.'),
      E('respectively','Vocabulary','7-8','A and B were X and Y, respectively','Engineering and Arts graduates entered work at rates of 72% and 48%, respectively.','Keep the order of items and figures identical.'),
      E('roughly twice as high as','Collocation','7-8','X is twice as high as Y','The urban figure was roughly twice as high as the rural one.','Do not write “two times higher than”.') ]},
    {id:'process',icon:'⇢',title:'Processes',short:'Stages and changes',description:'Organise stages logically and use passive structures when the action matters more than the actor.',entries:[
      E('is then transferred to','Verb pattern','6-7','be + past participle + to','The mixture is then transferred to a drying chamber.','The passive keeps attention on the material.'),
      E('at the initial stage','Collocation','5-6','at the initial/final stage','At the initial stage, mature leaves are picked by hand.','Vary sequencing expressions; do not start every sentence with “then”.'),
      E('undergo','Vocabulary','7-8','undergo + process/change','The leaves undergo a brief heating process before being rolled.','A concise formal alternative to “go through”.'),
      E('cyclical','Adjective','7-8','a cyclical process','Overall, this is a cyclical process in which used water is returned to the first tank.','State whether the process is linear or cyclical in the overview.') ]},
    {id:'maps',icon:'⌖',title:'Maps',short:'Location and change',description:'Describe position, replacement, expansion and changes in land use.',entries:[
      E('was converted into','Verb pattern','6-7','A was converted into B','The former car park was converted into a public garden.','Use for a change of function.'),
      E('in the north-eastern corner','Collocation','5-6','in + corner / to the north of','A café was constructed in the north-eastern corner of the site.','Use “in” for an area and “to” for relative position.'),
      E('underwent substantial redevelopment','Collocation','7-8','place + underwent + change','The riverside area underwent substantial redevelopment over the period.','An effective overview phrase for multiple changes.'),
      E('adjacent to','Adjective','6-7','be adjacent to + noun','The new play area is adjacent to the community garden.','More precise than “near” when features touch or are very close.') ]},
    {id:'overview',icon:'◎',title:'Overview language',short:'Key features',description:'Select the dominant pattern, strongest contrast or most important stage before adding detail.',entries:[
      E('overall','Vocabulary','5-6','Overall, + main feature','Overall, all three regions recorded growth, although the North rose most rapidly.','An overview should not become a list of every number.'),
      E('the most striking feature','Collocation','6-7','the most striking feature is that','The most striking feature is that cycling overtook bus travel by 2024.','Choose a genuinely prominent feature.'),
      E('with the exception of','Collocation','7-8','all/most + with the exception of','All categories increased, with the exception of private car use.','Useful for a clear general pattern plus one outlier.') ]},
    {id:'comparison',icon:'⇄',title:'Comparisons',short:'Differences and similarity',description:'Make accurate comparisons using a clear reference point and compatible units.',entries:[
      E('compared with','Verb pattern','5-6','Compared with + noun, clause','Compared with the coastal figure, the inland rate was relatively low.','Use “compared with/to”, not “comparing with”.'),
      E('a similar pattern','Collocation','6-7','follow/show a similar pattern','The two younger groups followed a similar pattern throughout the period.','A pattern is more than one matching data point.'),
      E('the gap widened','Collocation','7-8','the gap between A and B widened/narrowed','The gap between rail and bus use widened considerably after 2018.','Name both values or categories when the reference is unclear.') ]}
  ],
  task2: [
    {id:'education',icon:'A',title:'Education',short:'Learning and access',description:'Language for curriculum, opportunity, skills and educational outcomes.',entries:[E('equip learners with','Collocation','6-7','equip somebody with + skill','Schools should equip learners with the skills required for financial independence.','A precise alternative to “give students skills”.'),E('educational attainment','Noun','7-8','improve/raise educational attainment','Early intervention can improve educational attainment among disadvantaged pupils.','Refers to results achieved in education.'),E('accessible','Adjective','5-6','be accessible to + group','Online materials should be accessible to learners with disabilities.','Do not confuse accessible with acceptable.')]},
    {id:'environment',icon:'♧',title:'Environment',short:'Climate and resources',description:'Language for causes, impacts, mitigation and sustainable choices.',entries:[E('curb carbon emissions','Collocation','7-8','curb/reduce emissions','Stricter efficiency standards could curb carbon emissions from transport.','Curb means control or limit growth.'),E('environmental degradation','Noun','6-7','cause/prevent environmental degradation','Poorly regulated mining can accelerate environmental degradation.','Use for broad damage to natural systems.'),E('renewable','Adjective','5-6','renewable energy/resources','Investment in renewable energy can reduce dependence on imported fuel.','Usually modifies energy, power, source or resource.')]},
    {id:'technology',icon:'⌘',title:'Technology',short:'Access and automation',description:'Language for digital access, innovation, dependence and unintended effects.',entries:[E('widen access to','Collocation','6-7','widen access to + service','Digital platforms can widen access to specialist education.','More specific than “help more people”.'),E('over-reliance on','Noun','7-8','an over-reliance on + noun','An over-reliance on automated feedback may weaken independent judgement.','Reliance takes the preposition “on”.'),E('data-driven','Adjective','7-8','data-driven decision/system','Data-driven tools can identify patterns that teachers might overlook.','Use only when decisions genuinely depend on data.')]},
    {id:'health',icon:'＋',title:'Health',short:'Prevention and care',description:'Language for public health, treatment, behaviour and access to care.',entries:[E('preventive care','Noun','6-7','invest in/provide preventive care','Investment in preventive care can reduce pressure on hospitals.','Preventive is preferred in formal health contexts.'),E('pose a health risk','Collocation','6-7','pose a risk to + person','Excessive air pollution poses a serious health risk to children.','Risks are posed, not made.'),E('sedentary','Adjective','7-8','a sedentary lifestyle','A sedentary lifestyle is associated with several chronic conditions.','Use for behaviour involving too much sitting.')]},
    {id:'society',icon:'◉',title:'Society & family',short:'Change and inequality',description:'Language for social cohesion, demographic change and family responsibilities.',entries:[E('social cohesion','Noun','7-8','strengthen/undermine social cohesion','Shared public spaces can strengthen social cohesion in diverse neighbourhoods.','Refers to connection and trust within a society.'),E('an ageing population','Collocation','6-7','support/serve an ageing population','Cities must adapt public transport to serve an ageing population.','Ageing describes the population trend.'),E('intergenerational','Adjective','7-8','intergenerational contact/conflict','Community projects can encourage intergenerational contact.','Links different age generations.')]},
    {id:'government',icon:'◇',title:'Government',short:'Policy and funding',description:'Language for regulation, public spending and policy outcomes.',entries:[E('allocate public funds to','Verb pattern','6-7','allocate funds/resources to + noun','Governments should allocate public funds to preventive healthcare.','Allocate requires a destination introduced by “to”.'),E('implement a policy','Collocation','5-6','introduce/implement/enforce a policy','A policy is effective only if local authorities can implement it consistently.','Policies are implemented; laws are often enforced.'),E('regulatory','Adjective','7-8','a regulatory framework','A clear regulatory framework is needed for emerging technologies.','Relates to official rules and oversight.')]},
    {id:'work',icon:'⌁',title:'Work & economy',short:'Employment and growth',description:'Language for labour markets, productivity, income and economic change.',entries:[E('boost productivity','Collocation','6-7','boost/improve productivity','Flexible scheduling may boost productivity by reducing burnout.','Productivity is output relative to inputs.'),E('job security','Noun','5-6','provide/threaten job security','Automation can threaten job security in routine occupations.','Do not confuse security with workplace safety.'),E('economically viable','Adjective','7-8','remain/become economically viable','Small farms may struggle to remain economically viable.','Means able to succeed financially over time.')]},
    {id:'crime',icon:'§',title:'Crime & law',short:'Causes and responses',description:'Language for offending, prevention, punishment and rehabilitation.',entries:[E('deter crime','Collocation','6-7','deter somebody from / deter crime','Visible policing may deter crime in high-risk areas.','Deter means discourage through fear of consequences.'),E('rehabilitation','Noun','7-8','invest in offender rehabilitation','Education in prison can support rehabilitation and reduce reoffending.','Focuses on successful return to society.'),E('law-abiding','Adjective','6-7','law-abiding citizen','Most residents are law-abiding and benefit from proportionate policing.','Hyphenate before a noun.')]},
    {id:'media',icon:'▣',title:'Media & culture',short:'Influence and identity',description:'Language for representation, advertising, cultural change and information.',entries:[E('shape public opinion','Collocation','6-7','shape/influence public opinion','News framing can shape public opinion during an election.','Use for gradual influence, not total control.'),E('media literacy','Noun','7-8','develop/promote media literacy','Media literacy helps young people evaluate unreliable claims.','The ability to access and assess media critically.'),E('culturally significant','Adjective','7-8','culturally significant site/practice','Historic markets can be both economically useful and culturally significant.','Explain the form of significance where possible.')]},
    {id:'global',icon:'◎',title:'Global issues',short:'Migration and cooperation',description:'Language for interconnected problems, international action and uneven impacts.',entries:[E('cross-border cooperation','Noun','7-8','require/strengthen cross-border cooperation','Climate adaptation requires sustained cross-border cooperation.','Useful when a problem cannot be solved nationally.'),E('address the root causes','Collocation','6-7','address/tackle the root causes of','Aid is more effective when it addresses the root causes of displacement.','Stronger than treating only the symptoms.'),E('disproportionate','Adjective','7-8','a disproportionate impact on','Food-price shocks have a disproportionate impact on low-income households.','Means larger than is reasonable or expected.')]}
  ]
};

const libraryExpansion = window.RUBRICLAB_EXTRA_LIBRARY || {};
Object.entries(libraryExpansion).forEach(([task, groups]) => {
  Object.entries(groups).forEach(([categoryId, entries]) => {
    const category = library[task]?.find(item => item.id === categoryId);
    if (category) category.entries.push(...entries);
  });
});

let libraryState = { task:'task1', category:'line', band:'all', kind:'all', query:'' };
function currentLibraryCategory(){ return library[libraryState.task].find(c=>c.id===libraryState.category) || library[libraryState.task][0]; }
function renderLibraryCategories(){
  const cats=library[libraryState.task];
  $('#category-kicker').textContent=`${libraryState.task==='task1'?'TASK 1':'TASK 2'} COLLECTIONS`;
  $('#category-title').textContent=libraryState.task==='task1'?'Choose a visual type':'Choose a topic';
  $('#category-list').innerHTML=cats.map(c=>`<button class="category-button ${c.id===libraryState.category?'active':''}" data-category="${c.id}"><span class="category-icon">${c.icon}</span><span><strong>${c.title}</strong><small>${c.short}</small></span><span>›</span></button>`).join('');
  $$('.category-button').forEach(b=>b.addEventListener('click',()=>{libraryState.category=b.dataset.category;renderLibraryCategories();renderLanguageList();}));
}
function renderLanguageList(){
  const c=currentLibraryCategory();
  $('#language-kicker').textContent=c.title.toUpperCase(); $('#language-title').textContent=c.short; $('#language-description').textContent=c.description;
  const q=libraryState.query.toLowerCase();
  const entries=c.entries.filter(e=>(libraryState.band==='all'||e.band===libraryState.band)&&(libraryState.kind==='all'||e.kind===libraryState.kind)&&(!q||`${e.term} ${e.pattern} ${e.example} ${e.note}`.toLowerCase().includes(q)));
  $('#entry-count').textContent=entries.length;
  $('#language-list').innerHTML=entries.length?entries.map(e=>`<article class="language-entry"><div class="entry-term"><span class="type-badge">${e.kind}</span><strong>${e.term}</strong><small>Formal / neutral academic use</small></div><div class="entry-body"><span class="entry-pattern">Pattern: ${e.pattern}</span><p class="entry-example">“${e.example}”</p><span class="entry-note">Usage note · ${e.note}</span></div><span class="band-label">Band ${e.band}${e.band==='7-8'?'+':''}</span></article>`).join(''):`<div class="empty-state"><strong>No entries match these filters.</strong><p>Try another band, language type or search term.</p></div>`;
}
function switchLibraryTask(task){ libraryState.task=task; libraryState.category=library[task][0].id; libraryState.band='all'; libraryState.kind='all'; $$('.task-switch button').forEach(b=>b.classList.toggle('active',b.dataset.libraryTask===task)); $$('#band-filters button').forEach(b=>b.classList.toggle('active',b.dataset.band==='all')); $('#kind-filter').value='all'; renderLibraryCategories(); renderLanguageList(); }

/* Practice */
const practiceBank = [
  {type:'cloze',topic:'Task 1 · Trends',prompt:'Choose the phrase that completes the sentence naturally.',sentence:'After rising rapidly in 2018, the figure ______ 42% for the remainder of the period.',options:['levelled off at','levelled off to','levelled at off','was level off at'],answer:'levelled off at',explanation:'“Level off at + figure” describes a value that becomes stable.'},
  {type:'cloze',topic:'Task 2 · Environment',prompt:'Complete the collocation.',sentence:'Stricter efficiency standards could ______ carbon emissions from private transport.',options:['curb','bend','refuse','cancel'],answer:'curb',explanation:'We “curb emissions” when we limit or control their growth.'},
  {type:'cloze',topic:'Task 1 · Maps',prompt:'Choose the correct preposition.',sentence:'A small café was constructed ______ the north-eastern corner of the park.',options:['in','at to','on to','by in'],answer:'in',explanation:'Use “in the corner” for a feature located inside a defined area.'},
  {type:'mcq',topic:'Academic register',prompt:'Which sentence is most appropriate for an IELTS essay?',sentence:'Select the option with suitable academic register.',options:['Lots of kids get stuff online nowadays.','Many young people now obtain information online.','Nowadays, kids totally get everything off the net.','A bunch of youngsters grab info from websites.'],answer:'Many young people now obtain information online.',explanation:'This option is clear, neutral and precise without unnecessary informality.'},
  {type:'mcq',topic:'Task 1 · Overview',prompt:'Which sentence is the strongest overview?',sentence:'A chart shows car use falling while train and bicycle use rise.',options:['Overall, private car use declined, whereas both alternatives became more common.','The car figure was 54% in 2012.','There were five methods in the chart.','I will describe all the changes below.'],answer:'Overall, private car use declined, whereas both alternatives became more common.',explanation:'A strong overview identifies the main pattern without listing detail.'},
  {type:'mcq',topic:'Cohesion',prompt:'Which linker correctly introduces a contrast?',sentence:'Online courses are flexible. ______, they may provide less direct interaction.',options:['However','Therefore','For example','Similarly'],answer:'However',explanation:'“However” signals a contrast between flexibility and limited interaction.'},
  {type:'best-word',topic:'Task 2 · Education',prompt:'Choose the most precise academic phrase.',sentence:'Schools should ______ practical skills that support financial independence.',options:['equip learners with','give learners many things about','put learners some','make skills for learners'],answer:'equip learners with',explanation:'“Equip somebody with skills” is a natural, precise collocation.'},
  {type:'best-word',topic:'Task 2 · Government',prompt:'Choose the most natural verb.',sentence:'Local authorities must ______ the policy consistently across all districts.',options:['implement','do','make up','perform out'],answer:'implement',explanation:'Policies, plans and systems are commonly “implemented”.'},
  {type:'best-word',topic:'Task 1 · Comparison',prompt:'Choose the most accurate comparison.',sentence:'At 40%, the urban rate was ______ the rural figure of 20%.',options:['twice as high as','two times higher from','double higher than','twice higher as'],answer:'twice as high as',explanation:'“Twice as high as” is the standard accurate comparison structure.'},
  {type:'word-family',topic:'Word families · Environment',prompt:'Choose the correct form of the word “sustain”.',sentence:'Long-term investment is essential for the ______ of the transport network.',options:['sustainability','sustainable','sustainably','sustain'],answer:'sustainability',explanation:'The article “the” and preposition “of” require a noun here: sustainability.'},
  {type:'word-family',topic:'Word families · Economy',prompt:'Choose the correct form of the word “economy”.',sentence:'The proposal is environmentally attractive but may not be ______ viable.',options:['economically','economic','economy','economise'],answer:'economically',explanation:'The adverb “economically” modifies the adjective “viable”.'},
  {type:'word-family',topic:'Word families · Access',prompt:'Choose the correct form of the word “access”.',sentence:'Public information should be fully ______ to people with visual impairments.',options:['accessible','access','accessibly','accessibility'],answer:'accessible',explanation:'After “be”, an adjective describes the subject: accessible.'},
  {type:'matching',topic:'Sentence logic · Cause',prompt:'Choose the best second half.',sentence:'If single items cost the same per unit as multipacks, ...',options:['the incentive to over-buy would be reduced.','although shoppers bought too much.','because the discount was a problem.','the prices have reduced yesterday.'],answer:'the incentive to over-buy would be reduced.',explanation:'This completes the second conditional and states a logical consequence.'},
  {type:'matching',topic:'Sentence logic · Contrast',prompt:'Choose the best second half.',sentence:'Although remote work can reduce commuting time, ...',options:['it may also weaken informal collaboration.','therefore workers commute every day.','for example the office is closed because.','and despite it improves all communication.'],answer:'it may also weaken informal collaboration.',explanation:'“Although” introduces a concession, so the main clause should present a contrasting limitation.'},
  {type:'matching',topic:'Task 1 · Process',prompt:'Choose the best second half.',sentence:'Once the leaves have been dried, ...',options:['they are sorted and packed for distribution.','the workers picked them first.','although the process is green tea.','they will heated in a container.'],answer:'they are sorted and packed for distribution.',explanation:'The time clause and passive main clause form a logical final process stage.'},
  {type:'highlight',topic:'Paragraph structure · Topic sentence',prompt:'Which sentence is the topic sentence?',sentence:'Read the four-sentence paragraph and select its main claim.',options:['Reliable public transport can reduce urban congestion in two ways.','First, frequent services persuade some commuters to leave their cars at home.','This lowers the number of vehicles entering the city centre at peak times.','For example, a new express route in one district cut average journey times.'],answer:'Reliable public transport can reduce urban congestion in two ways.',explanation:'The topic sentence states the controlling idea that the rest of the paragraph develops.'},
  {type:'highlight',topic:'Paragraph structure · Supporting idea',prompt:'Which sentence is the supporting idea?',sentence:'Identify the sentence that explains the main claim rather than introducing it or illustrating it.',options:['School gardens can improve children’s understanding of food.','By growing vegetables, pupils observe how weather and soil affect production.','For instance, one class may compare plants grown in shade and sunlight.','These experiences can also make unfamiliar foods less intimidating.'],answer:'By growing vegetables, pupils observe how weather and soil affect production.',explanation:'This sentence explains the mechanism behind the topic sentence.'},
  {type:'highlight',topic:'Paragraph structure · Example',prompt:'Which sentence is the example?',sentence:'Select the sentence that provides a concrete illustration.',options:['Flexible work can help parents remain in employment.','It allows them to arrange working hours around essential care.','For example, a parent may begin earlier and collect a child after school.','As a result, firms may retain experienced staff.'],answer:'For example, a parent may begin earlier and collect a child after school.',explanation:'The explicit scenario illustrates how flexible scheduling works in practice.'}
];

practiceBank.push(...(window.RUBRICLAB_EXTRA_PRACTICE || []));

let practiceState={mode:'all',questions:[],index:0,correct:0,answered:false};
function shuffle(items){ const a=[...items]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function typeLabel(type){ return ({cloze:'Fill the gap',mcq:'Multiple choice','best-word':'Best word','word-family':'Word family',matching:'Match sentence halves',highlight:'Paragraph highlighting'})[type]; }
function startPractice(mode='all'){
  practiceState.mode=mode; const pool=mode==='all'?practiceBank:practiceBank.filter(q=>q.type===mode); const limit=mode==='all'?Math.min(20,pool.length):pool.length;
  practiceState.questions=shuffle(pool).slice(0,limit).map(q=>({...q,options:shuffle(q.options)})); practiceState.index=0;practiceState.correct=0;practiceState.answered=false;
  $$('.activity-menu button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode)); updateSessionSummary(); renderPractice();
}
function updateSessionSummary(){ const done=practiceState.index+(practiceState.answered?1:0); $('#session-score').textContent=`${practiceState.correct} correct`; $('#session-progress').textContent=`${Math.min(done,practiceState.questions.length)} of ${practiceState.questions.length} completed`; }
function renderPractice(){
  const card=$('#practice-card'); const total=practiceState.questions.length;
  if(practiceState.index>=total){ const pct=Math.round(practiceState.correct/total*100); card.innerHTML=`<div class="session-complete"><div class="complete-ring"><strong>${pct}%</strong><small>${practiceState.correct}/${total} correct</small></div><p class="eyebrow">SESSION COMPLETE</p><h2>Good retrieval work.</h2><p class="practice-instruction">Review the explanations, then repeat the set later with a new shuffled order.</p><button class="primary-button" id="restart-practice">Practise again <span>↻</span></button></div>`; $('#restart-practice').addEventListener('click',()=>startPractice(practiceState.mode)); return; }
  const q=practiceState.questions[practiceState.index];
  card.innerHTML=`<div class="question-top"><span class="question-count">Question ${practiceState.index+1} / ${total}</span><span class="question-type">${typeLabel(q.type)}</span></div><div class="question-progress"><span style="width:${(practiceState.index/total)*100}%"></span></div><span class="question-topic">${q.topic}</span><h2>${q.prompt}</h2><p class="practice-instruction">Choose one answer. The four options are shuffled each time you start a session.</p><div class="sentence-box">${q.sentence}</div><div class="options-grid">${q.options.map((o,i)=>`<button class="option-button" data-answer="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${o}</span></button>`).join('')}</div><div id="answer-feedback"></div><div class="question-actions"><small>One question at a time · four options</small><button class="primary-button" id="next-question" hidden>Next question <span>→</span></button></div>`;
  $$('.option-button',card).forEach(b=>b.addEventListener('click',()=>answerPractice(Number(b.dataset.answer))));
}
function answerPractice(index){
  if(practiceState.answered)return; practiceState.answered=true; const q=practiceState.questions[practiceState.index]; const selected=q.options[index]; const correct=selected===q.answer; if(correct)practiceState.correct++;
  $$('.option-button',$('#practice-card')).forEach((b,i)=>{b.disabled=true; const value=q.options[i]; if(value===q.answer)b.classList.add('correct'); else if(i===index)b.classList.add('wrong');});
  $('#answer-feedback').innerHTML=`<div class="feedback-box ${correct?'':'wrong'}"><strong>${correct?'Correct — well chosen.':'Not quite — compare the pattern.'}</strong><p>${q.explanation}</p></div>`;
  $('#next-question').hidden=false; $('#next-question').addEventListener('click',()=>{practiceState.index++;practiceState.answered=false;updateSessionSummary();renderPractice();}); updateSessionSummary();
}

/* Events and init */
$$('.nav-item').forEach(button=>button.addEventListener('click',()=>{
  $$('.nav-item').forEach(x=>x.classList.remove('active')); button.classList.add('active');
  $$('.view').forEach(x=>x.classList.remove('active')); $(`#${button.dataset.view}-view`).classList.add('active'); window.scrollTo({top:0,behavior:'smooth'});
}));
$$('.segment').forEach(button=>button.addEventListener('click',()=>switchTask(button.dataset.task)));
$('#previous-prompt').addEventListener('click',()=>selectPrompt(writingState.promptIndex-1));
$('#next-prompt').addEventListener('click',()=>selectPrompt(writingState.promptIndex+1));
$('#essay').addEventListener('input',()=>{syncAnnotationOffsetsFromDom();updateStats();$('#autosave-status').textContent='Saving…';clearTimeout(autosaveTimer);autosaveTimer=setTimeout(()=>{localStorage.setItem(`rubriclab-${writingState.task}-draft`,$('#essay').value);$('#autosave-status').textContent='Draft saved locally';},500);});
$('#essay').addEventListener('mouseup',captureEssaySelection);
$('#essay').addEventListener('keyup',captureEssaySelection);
$('#essay').addEventListener('paste',event=>{event.preventDefault();document.execCommand('insertText',false,event.clipboardData.getData('text/plain'));});
$('#annotation-rail').addEventListener('keydown',event=>{if(event.key==='Enter' && event.target.dataset.annotationCard) focusAnnotation(event.target.dataset.annotationCard);});
$('#mark-strong').addEventListener('click',()=>addSelectionAnnotation('strong'));
$('#mark-revision').addEventListener('click',()=>addSelectionAnnotation('revision'));
window.addEventListener('resize',()=>requestAnimationFrame(positionAnnotationCards));
$('#new-draft').addEventListener('click',()=>{if(confirm('Start a new blank draft? Your saved draft will remain in this browser until you type again.')){inlineAnnotations=inlineAnnotations.filter(item=>item.promptKey!==currentPromptKey());saveInlineAnnotations();$('#essay').value='';renderEditorAnnotations();updateStats();$('#essay').focus();}});
$('#analyse-button').addEventListener('click',()=>{calculateScores();renderScores();generateAutoAnnotations();setFeedbackTab('rubric');$('.analysis-state').innerHTML='<i></i> Review complete';showToast('Rubric review and inline comments updated');});
$$('.score-row').forEach(row=>row.addEventListener('click',()=>renderCriterion(row.dataset.criterion)));
$$('[data-feedback-tab]').forEach(button=>button.addEventListener('click',()=>setFeedbackTab(button.dataset.feedbackTab)));
$('#comment-input').addEventListener('input',event=>{$('#comment-characters').textContent=event.target.value.length;});
$('#comment-form').addEventListener('submit',event=>{event.preventDefault();const input=$('#comment-input');const text=input.value.trim();if(!text){showToast('Write a comment before saving');input.focus();return;}writingComments.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,promptKey:currentPromptKey(),text,createdAt:Date.now()});saveComments();input.value='';$('#comment-characters').textContent='0';renderComments();showToast('Comment saved');});
$('#copy-feedback').addEventListener('click',async()=>{const s=writingState.scores;const notes=writingComments.filter(item=>item.promptKey===currentPromptKey()).map(item=>`- ${item.text}`).join('\n');const text=`RubricLab feedback\nOverall: ${$('#overall-score').textContent}\nTR/TA: ${s.TR.toFixed(1)} | CC: ${s.CC.toFixed(1)} | LR: ${s.LR.toFixed(1)} | GRA: ${s.GRA.toFixed(1)}\nPriority: ${rubricCopy[writingState.activeCriterion].improve}${notes?`\nComments:\n${notes}`:''}`;try{await navigator.clipboard.writeText(text);showToast('Feedback copied');}catch{showToast('Copy is unavailable in this browser');}});
$$('[data-library-task]').forEach(b=>b.addEventListener('click',()=>switchLibraryTask(b.dataset.libraryTask)));
$$('#band-filters button').forEach(b=>b.addEventListener('click',()=>{libraryState.band=b.dataset.band;$$('#band-filters button').forEach(x=>x.classList.toggle('active',x===b));renderLanguageList();}));
$('#kind-filter').addEventListener('change',e=>{libraryState.kind=e.target.value;renderLanguageList();});
$('#library-search').addEventListener('input',e=>{libraryState.query=e.target.value;renderLanguageList();});
$$('.activity-menu button').forEach(b=>b.addEventListener('click',()=>startPractice(b.dataset.mode)));

function init(){
  const editor=$('#essay');
  Object.defineProperty(editor,'value',{configurable:true,get(){return this.innerText.replace(/\u00a0/g,' ');},set(value){this.textContent=value||'';}});
  $('#essay').value=localStorage.getItem('rubriclab-task2-draft')||task2Sample;
  $('#task1-prompt-count').textContent=prompts.task1.length;
  $('#task2-prompt-count').textContent=prompts.task2.length;
  const libraryTotal=Object.values(library).flat().reduce((sum,category)=>sum+category.entries.length,0);
  $('#library-total').textContent=`${libraryTotal} language entries`;
  $('#practice-bank-total').textContent=`${practiceBank.length}-question bank`;
  setPromptOptions();updateStats();calculateScores();renderScores();renderComments();renderLibraryCategories();renderLanguageList();startPractice('all');
}
init();
