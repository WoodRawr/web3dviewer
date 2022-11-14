/*
React imports
*/
import React, { Component } from "react";
import ReactDOM from "react-dom";

/*
Three JS imports
*/
import * as THREE from "three"; 
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class ModelViewer extends React.Component {

    componentDidMount() {
    /*
    Three JS scene instantiation
    */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    /*
    Orbital Controls instantiation
    */
    const controls = new OrbitControls( camera, renderer.domElement );

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set( 0, 0, 10);
    controls.update();

    /*
    Scene setup
    */
    //TODO: Check why appendChild is needed here
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 3;  //camera distance from the object
    var animate = function () {
      requestAnimationFrame( animate );
      //cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }

    render() {
      return <div ref={ref => (this.mount = ref)} />;
    }
  }

  export default ModelViewer;