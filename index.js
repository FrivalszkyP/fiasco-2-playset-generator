const puppeteer = require('puppeteer');
const fs = require('fs').promises;

const type = 'Relationship';
const category = 'BETRAYAL';
const title = 'Bully and bullied';
const playset = 'Back To the Old House';

const cards = [
    ['Relationship', 'BETRAYAL', 'Bully and bullied'],
    ['Relationship', 'BETRAYAL', 'Buyer and seller'],
    ['Relationship', 'OBLIGATION', 'Nurse and patient'],
    ['Relationship', 'FAMILY', 'Childhood accomplices'],
    ['Relationship', 'FAMILY', 'Parent and child'],
    ['Relationship', 'FAMILY', 'Auntie Beryl and Uncle Death'],
    ['Relationship', 'FAMILY', '“It made us from the same old bones”'],
    ['Relationship', 'FAMILY', 'Rival/devoted siblings'],
    ['Relationship', 'IN DREAMS', '“We dream the same dream”'],
    ['Relationship', 'IN DREAMS', 'Hunter and hunted'],
    ['Relationship', 'IN DREAMS', 'One heard the voices, one made the plan'],
    ['Relationship', 'LOCAL NEWS', 'Radio DJ and creepy folk musician'],
    ['Relationship', 'LOCAL NEWS', 'Paranormal investigator and podcaster'],
    ['Relationship', 'LOCAL NEWS', 'Photographer and victim'],
    ['Relationship', 'LOCAL NEWS', 'Washed up celebrity and notorious graffiti artist'],
    ['Relationship', 'HOUSEHOLD CHORES', 'Architect and builder'],
    ['Relationship', 'HOUSEHOLD CHORES', 'Decorator and debt collector'],
    ['Needs', 'TO GET REVENGE', '...on a coward'],
    ['Needs', 'TO GET REVENGE', '...on a traitor'],
    ['Needs', 'TO GET REVENGE', '...on the one who brought you back'],
    ['Needs', 'TO CONTROL', '...the pain from the wound and/or operation'],
    ['Needs', 'TO CONTROL', '...an overwhelming sense of guilt, grief or shame'],
    ['Needs', 'TO CONTROL', '...the crowds that seem to be gathering'],
    ['Needs', 'TO EXPOSE', '...the lie that holds everything together'],
    ['Needs', 'TO EXPOSE', '...your own skeletons'],
    ['Needs', 'TO EXPOSE', '...the truth about what they did to you'],
    ['Needs', 'TO BE LOVED', '...by the voices'],
    ['Needs', 'TO BE LOVED', '...by your victims'],
    ['Locations', 'CRIME SCENES', 'Room where all the killing will happen'],
    ['Locations', 'CRIME SCENES', 'Top floor of the Crestmoor, Upper West Side, New York City'],
    ['Locations', 'DARKNESS', '...at a terrible performance'],
    ['Locations', 'DARKNESS', '...in the tunnels under the house'],
    ['Locations', 'OUTSIDE', 'At another funeral'],
    ['Locations', 'BETWEEN THE CRACKS', 'An impossible beach'],
    ['Locations', 'BETWEEN THE CRACKS', 'Lost in television'],
    ['Locations', 'HOME COMFORTS', 'Radio room'],
    ['Objects', 'APPLIANCES', 'Huge archaic switchboard'],
    ['Objects', 'WORKING FROM HOME', 'Instruction manual'],
    ['Objects', 'DANGEROUS', 'Last Will & Testament'],
    ['Objects', 'DANGEROUS', 'Box of old letters'],
    ['Objects', 'HIDDEN', 'Photographs that should stay hidden'],
    ['Objects', 'HIDDEN', 'Diary that should never be read'],
    ['Objects', 'HIDDEN', 'Partially completed to-do list'],
    ['Objects', 'HIDDEN', 'Doorway connecting physically unconnected places'],
];

(async () => {
    const template = await fs.readFile('public/index.html', { encoding: 'utf-8' });
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1000 });

    for (const i in cards) {
        const [type, category, title] = cards[i];
        const html = template
            .replace('#TYPE#', type.toLowerCase())
            .replace('#CATEGORY#', category)
            .replace('#TITLE#', title)
            .replace('#PLAYSET#', playset);
        const filename = `${type}-${category}-${title}.jpg`;
        await page.setContent(html);
        await page.screenshot({
            path: 'output/' + filename.replace('/', '-'),
            type: 'jpeg',
            quality: 90,
            clip: {
                height: 825,
                width: 1125,
                x: 0,
                y: 0,
            },
        });
    }
    browser.close();
})();
