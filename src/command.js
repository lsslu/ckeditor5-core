/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module core/command
 */

import ObservableMixin from '@ckeditor/ckeditor5-utils/src/observablemixin';
import mix from '@ckeditor/ckeditor5-utils/src/mix';

/**
 * The base class for CKEditor commands.
 *
 * Commands are the main way to manipulate editor contents and state. They are mostly used by UI elements (or by other
 * commands) to make changes in the model. Commands are available in every part of code that has access to
 * the {@link module:core/editor/editor~Editor editor} instance.
 *
 * Instances of registered commands can be retrieved from {@link module:core/editor/editor~Editor#commands}.
 * The shortest way to execute a command is through {@link module:core/editor/editor~Editor#execute}.
 *
 * @implements CommandInterface
 * @mixes module:utils/observablemixin~ObservaleMixin
 */
export default class Command {
	/**
	 * Creates a new `Command` instance.
	 *
	 * @param {module:core/editor/editor~Editor} editor Editor on which this command will be used.
	 */
	constructor( editor ) {
		/**
		 * The editor on which this command will be used.
		 *
		 * @readonly
		 * @member {module:core/editor/editor~Editor}
		 */
		this.editor = editor;

		this.set( 'value', null );
		this.set( 'isEnabled', false );

		this.decorate( 'execute' );

		// By default every command is refreshed when changes are applied to the model.
		this.listenTo( this.editor.document, 'changesDone', () => {
			this.refresh();
		} );
	}

	/**
	 * Destroys the command.
	 */
	destroy() {
		this.stopListening();
	}
}

mix( Command, ObservableMixin );

/**
 * The command interface. Usually implemented by inheriting from the {@link Command base `Command` class}.
 *
 * @interface CommandInterface
 */

/**
 * Flag indicating whether a command is enabled or disabled.
 * A disabled command should do nothing when executed.
 *
 * @observable
 * @readonly
 * @member {Boolean} #isEnabled
 */

/**
 * The value of a command. Concrete command class should define what it represents.
 *
 * For example, the `bold` command's value is whether the selection starts in a bolded text.
 * And the value of the `link` command may be an object with links details.
 *
 * It's possible for a command to have no value (e.g. for stateless actions such as `uploadImage`).
 *
 * @observable
 * @readonly
 * @member #value
 */

/**
 * Executes the command.
 *
 * A command may accept parameters. They will be passed from {@link module:core/editor/editor~Editor#execute}
 * to the command.
 *
 * The `execute()` method should abort when the command is disabled ({@link #isEnabled} is `false`).
 *
 * @method #execute
 */

/**
 * Refreshes the command. The command should update its {@link #isEnabled} and {@link #value} property
 * in this method.
 *
 * @method #refresh
 */

/**
 * Event fired by the {@link #execute} method. The command action is a listener to this event so it's
 * possible to change/cancel the behavior of the command by listening to this event.
 *
 * See {@link module:utils/observablemixin~ObservableMixin#decorate} for more information and samples.
 *
 * **Note:** This event is fired even if command is disabled.
 *
 * @event execute
 */
