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
export const seedSelect = document.querySelector('[data-selectSeed]');
export const seedNameInput = document.querySelector('[data-seedName]');
export const renameBtn = document.querySelector('[data-rename]');
export const deleteBtn = document.querySelector('[data-delete]');

// starting config
export const SPEED = 50;
export const LOCAL_STORAGE_SEEDS = 'seeds';
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
	SPEED,
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
	seedSelect,
	seedNameInput,
	renameBtn,
	deleteBtn,
	LOCAL_STORAGE_SEEDS,
};
