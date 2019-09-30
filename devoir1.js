// Vous êtes à la recherche d'une maison, mais les webapp et les interfaces graphiques vous donnent mal au coeur!
// (C'est normal vu que vous aimez beaucoup la ligne de commande!!!)
// Vous avez demandé à votre ami hackeman de vous trouver les codes d'accès direct à la base de données.
//////////////////////////////////
//// Il vous dit d'éxécuter les lignes suivantes:
// docker stop mongo_devoir1
// docker system prune -f
// docker run -d --name mongo_devoir1 mongo:4.2
// docker exec -it mongo_devoir1 mongo ds349587.mlab.com:49587/glo4035-datasets -u etudiant -p maison2000
//////////////////////////////////
// Comme c'est une mongoDB (c'est pas pantoute arrangé avec le gars des vues....), 
// vous utilisez votre grande expertise pour trouver la maison de vos rêves.
// Les critères données aux questions suivantes sont CUMULATIFS! 
//////////////////////////////////
// Enfilez votre trench-coat et vos lunettes fumées de hacker.
// https://i.imgur.com/iVHfwLc.gif
//////////////////////////////////
// Pour tester votre solution
// docker exec -i mongo_devoir1 mongo < devoir1.js
//////////////////////////////////
// Listez les collections des documents. Créez la variable maison qui pointe vers la collection. 
maison=db['devoir1']



// 0. Creez une variable ulaval contenant un objet geospatial pouvant être utilisé pour faire des requêtes
// géospatiales near. Utilisez les coordonnées suivantes. latitude = 46.778665, longitude = -71.274410.
// Ce sont des coordonnées du Pavillon Pouliot de l'université Laval.
print("#Q0")
ulaval= {
      type: "Point",
      coordinates: [-71.274410, 46.778665]
}



// 1. Quel champ de la base de données contient un index géospatial?
tes4t =db[‘system.indexes’].findOne({“2dsphereIndexVersion”: {$exists:true}})
print("#Q1")
for(t in tes4t.key){
print("#Q1")
print(t)
}



// 2. Combien de maisons à vendre y a-t-il dans un rayon de 10km de votre emplacement actuel?
print("#Q2")


// 3. Combien de maisons à vendre y a-t-il dans la zone précédente si on enlève les maisons à l'intérieur de 1km?
// Hint. si vous multipliez la reponse de la question 2 et de la question 3 - et que vous la passez un md5 hash, vous devriez obtenir  66351ff66c1492921628337667462b5a 
print("#Q3")


// 4. Le prix que vous désirez payer est entre 200 000 et 450 000. Combien de maisons répondent à ce critère?
print("#Q4")
maison.find({price:{$gte :200000,$lte:450000}}).count()


// 5. De plus, vous détestez l'humidité l'été (vous voulez une thermopompe) et le chauffage par plinthe, mais vous aimez le chauffage à bois! 
// Combien de maisons répondent à tous ces critères
print("#Q5")
maison.find({$and:[{heating_source:{$nin:[“Plintre”]}},{heating_source:{$in:[“Thermopompe”,”Bois”]}}]}).count()

// 6. Pour des soucis d'uniformité, vous désirez une maison avec un seul élément composant sa façade extérieure! Combien de maisons répondent à ce critère?
print("#Q6")
maison.find({external_facing:{$size:1}}).toArray()


// 7. Bravo! vous avez trouve la maison de vos rêves! regardez la bien! Oh non! Elle est SUR LA RIVE SUD DE QUÉBEC!
// Vous êtes prêts a plusieurs compromis, mais la mention du mot Rive-Sud dans son identifiant vous fait frissonner.
// Vous êtes prêt à vous débarrasser de votre thermopompe ou votre chauffage au bois pour ne pas avoir de mention rive-sud ou
// chaudiere-appalaches dans l'identifiant (URL) de la maison. Combien de maisons répondent à ce critère ?
print("#Q7")
maison.find({$and:[{listing_id:{/.*rive-sud.*/ ,/.*chaudiere-appalaches.*/]}},{heating_source:{$nin:[“Thermopompe”,”Bois”]}}]}).count()

// 8. Comme vous savez que vous allez faire beaucoup de $$$ dans le futur, vous décidez d'hypothéquer votre vie avec la maison la plus chère du lot.
// Combien coute-t-elle ? (je désire le prix de la base de données - et non pas celle du site!)
print("#Q8")
maison.find().sort({price:-1})[0]

// 9. Pouvez-vous m'extraire automatiquement le nom de la ville dans laquelle se trouve votre maison de rêves? N'oubliez pas que le nom d'une 
// ville commence par une lettre majuscule!
print("#Q9")
maison.findOne({_id:ObjectId(“5a19c5ebf16397d8cb4c779d”}).listing_id.split(“/”)[3].toUpperCase()
