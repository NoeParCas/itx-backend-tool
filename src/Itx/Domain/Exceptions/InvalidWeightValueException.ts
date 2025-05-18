import { InvalidValueException } from './InvalidValueException'

export default class InvalidWeightValueException extends InvalidValueException {
	public constructor(bodyParams: object) {
		super(`The sum of all weights must be equal to 1. Received: ${JSON.stringify(bodyParams)}`)
	}
}
