/*
React imports
*/
import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

/*
Three JS imports
*/
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/*
RoomPlan JSON Import
*/
import ExampleRoomData from './resource/example.json'

class ModelViewer extends React.Component {

  componentDidMount() {

    /*
    Three JS scene instantiation
    */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    /*
    Orbital Controls instantiation
    */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; //Camera rotation interpolation
    controls.maxDistance = 7; //Maximum camera dolly distance

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 0, 10);
    controls.saveState();
    controls.update();

    /*
    API Fetching Experiment
    */
    const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
    fetch(apiUrl)
      .then((response) => response.json())
    //.then((data) => console.log('This is your data', data));  //Outputting data, uncomment this to see example data from GitHub

    /*
    Scene setup
    */
    //TODO: Check why appendChild is needed here
    this.mount.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(0.38590455055236816, 2.689960241317749, 0);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 3;  //default camera distance from the object

    /*
    Custom Transformation Experiment
    */
    const m = new THREE.Matrix4();

    m.set(  -0.97375565767288208, 0,  0.22759565711021423, 0,
      0, 1.0000001192092896, 0, 0,
      -0.22759565711021423,  0,  -0.97375565767288208, 0,
      0.16735656559467316, 0.1113053634762764, 1.4850519895553589, 1 );
    
   cube.applyMatrix4(m);
   cube.matrixAutoUpdate = false;


    /*
      JSON Experiment
    */
    var data = require('./resource/example.json');
    console.log(data);

    


   /*
    animate
   */
    var animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }

  reset3DView = () => {
    console.log("Resetting 3D View in ModelViewer");
  };

  render() {
    return (<div ref={ref => (this.mount = ref)} id="KitchenViewer" />);
  }
}

export default ModelViewer;