const toFindCriteries = [
  'christopherkarltom@outlook.com',
  '5088979700',
  'Christopher',
  'Tom',
  'Christopher Tom',
  'xtremebling@hotmail.com',
  '9098383780',
  'gypsy',
  'SORUM',
  'gypsy SORUM',
  'bigdaddyj10@mac.com',
  '3236621667',
  'Joshua',
  'Stamberg',
  'Joshua Stamberg',
  'tklbustr@gmail.com',
  '7148013445',
  'A L',
  'Knapp',
  'A L Knapp',
  'dreamzfirst@outlook.com',
  '7143975076',
  'Janine',
  'Chow',
  'Janine Chow',
  'darrellwhitelaw@me.com',
  '3472552839',
  'Darrell',
  'Whitelaw',
  'Darrell Whitelaw',
  'Ib.bn@outlook.com',
  '9165869215',
  'Ibrahim',
  'Buan',
  'Ibrahim Buan',
  'rohanb10@gmail.com',
  '3144090407',
  'Roha',
  'Bhan',
  'Roha Bhan',
  'steve.johnson.oc@gmail.com',
  '5302195687',
  'Steven',
  'Johnson',
  'Steven Johnson',
  'bomb4rda@gmail.com',
  '5624477087',
  'Jason',
  'Ochoa',
  'Jason Ochoa',
  'jacana8022@inbox.com',
  '15416017014',
  'James',
  'Miller',
  'James Miller',
  'idroid17@gmail.com',
  '2094682730',
  'Peter',
  'Nguyen',
  'Peter Nguyen',
  'ross212@gmail.com',
  '7075370935',
  'Ian',
  'Ross',
  'Ian Ross',
  'shanroseca@yahoo.com',
  '6028209242',
  'Shannon',
  'Rose',
  'Shannon Rose',
  'silvajajo@yahoo.com',
  '6197603484',
  'Saly',
  'Hana',
  'Saly Hana',
  'ritaotawork@gmail.com',
  '6179470605',
  'Rita',
  'Root',
  'Rita Root',
  'bspiri@aol.com',
  '7075393651',
  'Walter',
  'Spirifonoff',
  'Walter Spirifonoff',
  'ben.alingh@gmail.com',
  '9139080202',
  'Ben',
  'Alingh',
  'Ben Alingh',
  'kstangen@aol.com',
  '7609851460',
  'Kelly',
  'Arnold',
  'Kelly Arnold',
  'ernstkathleen3@gmail.com',
  '5307481200',
  'Kathleen',
  'Ernst',
  'Kathleen Ernst',
  'yoonie.yc@gmail.com',
  '9492857535',
  'Yunna',
  'Choi',
  'Yunna Choi'
];

const placeToReplace = '$$$$';

const query2 = "with constants (searchText) as (values('%$$$$%')) select count(*) from searchable_recipes, constants where customer_id = 636 and (lower(custom::text) like searchText or lower(product::text) like searchText or lower(configuration::text) like searchText);"

const query = "with constants (searchText) as (values('%$$$$%')) select id, name, custom, configuration from searchable_recipes, constants where (lower(custom::text) like searchText or lower(product::text) like searchText or lower(configuration::text) like searchText) limit 100;";


const generateQuerys = () => {
  toFindCriteries.forEach(critery => {
    const newQuery = query.replace(placeToReplace, critery);
    console.log(`\n${newQuery}\n`);
  });
};

const generateQuerys2 = () => {
  toFindCriteries.forEach(critery => {
    const newQuery = query2.replace(placeToReplace, critery);
    console.log(`\n${newQuery}\n`);
  });
};

generateQuerys2();