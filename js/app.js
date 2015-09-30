//on prend la app définit sur la page
var myApp = angular.module('myApp',['ngRoute']);
//mot clé d'angular commence en géné par $ ou $$, ex $scope ou $routeProvider
myApp.config(function($routeProvider){
	//on ajoute deux routes
	$routeProvider
		//page accueil
		.when('/',{
			controller:'form1Controller',
			templateUrl:'templates/form1.html'
		})
		.when('/form1',{
			controller:'form1Controller',
			templateUrl:'templates/form1.html'
		})
		// form2
		.when('/form2',{
			controller:'form2Controller',
			templateUrl:'templates/form2.html'
		})
		//form3
		.when('/form3',{
			controller:'form3Controller',
			templateUrl:'templates/form3.html'
		})
		//404
		.when('/404',{
			controller:'quatrecentquatreController',
			templateUrl:'templates/404.html'
		})
		//si aucun pattern ne correspond
		.otherwise({redirectTo:'/404'})
		;
});

//factory pour la création dynamique de champs
myApp.factory('formFactory',function(){
	//modèle de champs
	var champ={
			nom:'',
			nomlib:'',
			type:'',
			valeur:'',
			validationtype:'',
			validation:'',
			requis:'',
			errors:[]
		};
	//modèle d'erreurs 
	var error={
				type:'',
				texte:''
			}

	var factory={}

	//function de création d'un champ de type texte
	factory.initChampTexte=function(){
		//faire une copie de modèle car tout est passé par référence et donc
		//risque d'écrasement de données
		var champTexte = angular.copy(champ);
		//personnalisation du champ
		champTexte.type='input',
		champTexte.validationtype='regexp';
		champTexte.validation=/^[a-zA-Z]+$/;
		//ajout de la première erreur
		var err = angular.copy(error);
		err.type="required";
		err.texte="";
		champTexte.errors.push(err);
		//ajout de la seconde erreur
		err = angular.copy(error);
		err.type="pattern";
		err.texte="Only letters are allowed.";
		champTexte.errors.push(err);

		console.log(champTexte);
		return champTexte;
	}

	//function de création d'un champ de type téléphone
	factory.initChampTelFixe=function(){
		var ChampTelFixe = angular.copy(champ);
		//personnalisation du champ
		ChampTelFixe.type='input',
		ChampTelFixe.validationtype='fonction';
		ChampTelFixe.validation='valTelFixe';
		//ajout de la première erreur
		var err = angular.copy(error);
		err.type="required";
		err.texte="";
		ChampTelFixe.errors.push(err);
		//ajout de la seconde erreur
		err = angular.copy(error);
		err.type="pattern";
		err.texte="pas bien";
		ChampTelFixe.errors.push(err);

		console.log(ChampTelFixe);
		return ChampTelFixe;
	}

	return factory;
});

//controlleur de ma form1
myApp.controller('form1Controller', function($scope,$filter,formFactory){
	$scope.champs=[];

	//méthode d'initialisation de l'écran=> ajout des champs
	function init(){
		//ajout du champ nom
		var champNom = formFactory.initChampTexte();
		champNom.nom='lastname';
		champNom.nomlib='Nom';
		champNom.requis=true;
		$scope.champs.push(champNom);
		//ajout du champ prénom
		var champPrenom = formFactory.initChampTexte();
		champPrenom.nom='firstname';
		champPrenom.nomlib='Prenom';
		champPrenom.requis=true;
		$scope.champs.push(champPrenom);
		//ajout du champ prénom
		var champTel = formFactory.initChampTelFixe();
		champTel.nom='tel';
		champTel.nomlib='Téléphone';
		champTel.requis=true;
		champTel.validation = champTel.validation+'(\'form1\',\''+champTel.nom+'\')';
		$scope.champs.push(champTel);

		console.log($scope.champs);
	}
	init();

	//fonction de validation d'un numéro de téléphone fixe
	$scope.valTelFixe=function(nomform,nom){
		//récupération de mon controle depuis mon tableau de champs
		var obj = $filter('filter')($scope.champs, {nom: nom}, true)
		var regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}/;
		//controle de l'expression régulière
        if (!obj[0].valeur.match(regExp)) {
        	//mise à jour de la validité uniquement sur le controle sur la vue
			$scope[nomform][nom].$setValidity('pattern', false);
        }
	};

	$scope.submitForm=function(){
		if($scope.form1.$valid)
		{
			console.log('ok ');
		}
		else
		{
			console.log('ko');
			alert('essaye encore!');
		}
	}
});
