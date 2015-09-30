//on prend la app définit sur la page
var myApp = angular.module('myApp',['ngRoute']);
//mot clé d'angular commence en géné par $ ou $$, ex $scope ou $routeProvider
myApp.config(function($routeProvider){
	//on ajoute deux routes
	$routeProvider
		//form 1 + page accueil
		.when('/',{
			controller:'form1Controller',
			templateUrl:'templates/form1.html'
		})
		// form2
		.when('/from2',{
			controller:'form2Controller',
			templateUrl:'templates/form2.html'
		})
		//form3
		.when('/from3',{
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

myApp.factory('formFactory',function(){
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
	var error={
				type:'',
				texte:''
			}

	var factory={}

	factory.initChampTexte=function(){
		var champTexte = angular.copy(champ);
		champTexte.type='input',
		champTexte.validationtype='regexp';
		champTexte.validation=/^[a-zA-Z]+$/;
		var err = angular.copy(error);
		err.type="required";
		champTexte.errors.push(err);
		err = angular.copy(error);
		err.type="pattern";
		err.texte="Only letters are allowed.";
		champTexte.errors.push(err);
		console.log(champTexte);
		return champTexte;
	}

	factory.initChampTelFixe=function(){
		var ChampTelFixe = angular.copy(champ);
		ChampTelFixe.type='input',
		ChampTelFixe.validationtype='fonction';
		ChampTelFixe.validation='valTelFixe';
		var err = angular.copy(error);
		err.type="required";
		ChampTelFixe.errors.push(err);
		err = angular.copy(error);
		err.type="pattern";
		err.texte="pas bien";
		ChampTelFixe.errors.push(err);
		console.log(ChampTelFixe);
		return ChampTelFixe;
	}

	return factory;
});

myApp.controller('form1Controller', function($scope,$filter,formFactory){
	$scope.champs=[];

	function init(){
		var champNom = formFactory.initChampTexte();
		champNom.nom='lastname';
		champNom.nomlib='Nom';
		champNom.requis=true;
		$scope.champs.push(champNom);
		 var champPrenom = formFactory.initChampTexte();
		 champPrenom.nom='firstname';
		 champPrenom.nomlib='Prenom';
		 champPrenom.requis=true;
		 $scope.champs.push(champPrenom);
		var champTel = formFactory.initChampTelFixe();
		champTel.nom='tel';
		champTel.nomlib='Téléphone';
		champTel.requis=true;
		champTel.validation = champTel.validation+'(\'form1\',\''+champTel.nom+'\')';
		$scope.champs.push(champTel);
		console.log($scope.champs);
	}
	init();

	$scope.valTelFixe=function(nomform,nom){
		var obj = $filter('filter')($scope.champs, {nom: nom}, true)
		var regExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
        if (!obj[0].valeur.match(regExp)) {
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
