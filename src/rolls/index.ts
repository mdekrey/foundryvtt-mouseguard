import { MouseDie, MouseRoll } from './MouseDie';

declare global {
	interface FoundryGame {
		mouseguard: {
			RollCount: number;
			RollMessage: string;
		};
	}
}

Hooks.once('init', function () {
	CONFIG.Dice.rolls.push(MouseRoll);
	CONFIG.Dice.terms['m'] = MouseDie;

	game.mouseguard = {
		RollCount: 0,
		RollMessage: '',
	};
});

Hooks.on('renderSidebarTab', async (_app, html) => {
	const template = './systems/mdekrey-mouseguard/templates/dice/mousetray.html';

	const $chat_form = html.find('#chat-form');
	const c = await renderTemplate(template);
	const $content = $(c);
	$chat_form.after($content);
	$content.find('[data-action="modify-dice"]').on('click', (event) => {
		event.preventDefault();
		if (event.currentTarget.dataset.mode === 'add') {
			game.mouseguard.RollCount++;
		} else {
			game.mouseguard.RollCount--;
		}

		if (game.mouseguard.RollCount < 1) game.mouseguard.RollCount = 0;

		// Render Dice in Dice Pool Area
		updateDisplay(game.mouseguard.RollCount);
	});

	$content.find('[data-action="roll-dice"]').on('click', (event) => {
		event.preventDefault();

		if (game.mouseguard.RollCount > 0) {
			const actor = game.user.character ?? canvas.tokens.controlled[0]?.actor;
			const roll = new MouseRoll(`${game.mouseguard.RollCount}dmcs>3`);
			roll.evaluate().then(
				() => {
					roll.toMessage({
						user: game.user.id,
						flavor: game.mouseguard.RollMessage,
						speaker: ChatMessage.getSpeaker({ actor: actor }),
					});

					game.mouseguard.RollCount = 0;
					game.mouseguard.RollMessage = '';
					updateDisplay(0);
				},
				() => {
					ui.notifications?.warn(`Dice could not be rolled.`);
				},
			);
		}
	});

	updateDisplay(game.mouseguard.RollCount);
});

function updateDisplay(count: number) {
	//let $mouse_rolls = html.find('.mouse-dice-roll');

	const diceHTML =
		'<li class="roll mousedie d6"><img src="systems/mdekrey-mouseguard/assets/dice/sword.webp" height="24" width="24"></li>';
	let theHTML = '';

	for (let i = 0; i < count; i++) {
		theHTML += diceHTML;
	}

	$('.mouse-dice-roll').html(theHTML);

	$('.mouse_dice_button.subtract').prop('disabled', !count);
	$('.mouse_roll_button').prop('disabled', !count);
}
