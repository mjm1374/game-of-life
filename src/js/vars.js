// Dom Objects
export const yearTag = document.getElementById('year');
export const canvas = document.getElementById('canvas-container');
export const ctx = canvas.getContext('2d');
export const genTarget = document.getElementById('gen');
export const stepBtn = document.querySelector('[data-step]');
export const runBtn = document.querySelector('[data-run]');
export const restBtn = document.querySelector('[data-reset]');
export const paintRadios = document.querySelectorAll('input[name="paint"]');
export const seedBtn = document.querySelector('[data-seed]');

// starting config
const speed = 50;
export let elemLeft = 0;
export let elemTop = 0;
export let x = 0;
export let y = 0;
export let id = 0;
export let generation = 0;
export let offset = 10;
export let canvasWidth = 1000;
export let canvasHeight = 500;

export default {
	yearTag,
	canvas,
	ctx,
	speed,
	elemLeft,
	elemTop,
	x,
	y,
	id,
	generation,
	offset,
	canvasWidth,
	canvasHeight,
	genTarget,
	stepBtn,
	runBtn,
	restBtn,
	paintRadios,
	seedBtn,
};
