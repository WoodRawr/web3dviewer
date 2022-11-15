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
import { Color, CullFaceBack, Vector2, Vector3 } from "three";

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

    /*
    var geometry = new THREE.BoxGeometry(0.38590455055236816, 2.689960241317749, 0);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    */
    camera.position.z = 3;  //default camera distance from the object

    /*
    Custom Transformation Experiment
    */
   /*
    const m = new THREE.Matrix4();

    m.set(  -0.97375565767288208, 0,  0.22759565711021423, 0,
      0, 1.0000001192092896, 0, 0,
      -0.22759565711021423,  0,  -0.97375565767288208, 0,
      0.16735656559467316, 0.1113053634762764, 1.4850519895553589, 1 );
    
   cube.applyMatrix4(m);
   cube.matrixAutoUpdate = false;
   */


    /*
      JSON Experiment
    */
    var data = require('./resource/example.json');
    console.log(data);

    var windows = data.windows
    var doors = data.doors
    var walls = data.walls
    var openings = data.openings
    var objects = data.objects

    /*
    console.log(windows);
    console.log(doors);
    console.log(walls);
    console.log(openings);
    console.log(objects);
    */

    /*
    const light = new THREE.PointLight( 0xff0000, 100, 500 );
    light.position.set( 50, 100, 50 );
    scene.add( light );
    */

    /*
    wall creation; extension of JSON Experiment
    */
    for (var i = 0; i < walls.length; i++)
    {
      var obj = walls[i];

      const m = new THREE.Matrix4();

      m.set( obj.transform[0],  obj.transform[1],   obj.transform[2],  obj.transform[3],
        obj.transform[4],  obj.transform[5],  obj.transform[6],  obj.transform[7],
        obj.transform[8],   obj.transform[9],   obj.transform[10],  obj.transform[11],
        obj.transform[12],  obj.transform[13],  obj.transform[14],  obj.transform[15] );
        
        m.set( obj.transform[15],  obj.transform[14],   obj.transform[13],  obj.transform[12],
          obj.transform[11],  obj.transform[10],  obj.transform[9],  obj.transform[8],
          obj.transform[7],   obj.transform[6],   obj.transform[5],  obj.transform[4],
          obj.transform[3],  obj.transform[2],  obj.transform[1],  obj.transform[0] );

      var translation = new THREE.Vector3();
      var rotation = new THREE.Quaternion();
      var scale = new THREE.Vector3();

      m.decompose(translation, rotation, scale);

      console.log(translation);
      console.log(rotation);
      console.log(scale);

      const material = new THREE.MeshBasicMaterial({color: 0x00FF00});
      var geometry = new THREE.BoxGeometry(obj.dimensions[0], obj.dimensions[1], obj.dimensions[2]);
      //var geometry = new THREE.BoxGeometry(1, 1, 1);

      //geometry.applyQuaternion(rotation);
      //geometry.translate(translation.x,translation.y,translation.z);
      
      //geometry.applyMatrix4(m);
      //var vec = new THREE.Vector3();
      //vec.setFromMatrixPosition(m);

        /*
      cube.applyMatrix4(m);
      */
      
      var cube = new THREE.Mesh(geometry, material);
      //cube.applyQuaternion(rotation);
      //cube.matrixAutoUpdate = false;
      scene.add(cube);
      //cube.matrixAutoUpdate = false;
      //cube.matrix.set(m);
      //cube.matrixAutoUpdate = false;
      cube.position.set(translation.x,translation.z,translation.y);
      
      //cube.position.set(vec);
      //cube.matrixAutoUpdate = false;
    }

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