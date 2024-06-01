class Formatting {
    static stringToStepsArray(inputString) {
        // Split the input string based on the occurrence of "Step "
        const stepsArray = inputString.split("Step ");

        // Remove the empty string at the beginning if present
        if (stepsArray[0] === "") {
            stepsArray.shift();
        }

        // Remove the unnecessary parts (like step numbers)
        const cleanedSteps = stepsArray.map(step => {
            // Remove any leading/trailing spaces
            step = step.trim();
            // Remove the step number if present
            return step.replace(/^\d+\s*:\s*/, '');
        });

        return cleanedSteps;
    }

    static arrayToStepsString(actionsArray) {
        // Iterate through each action in the array and format it with step numbers
        const stepsString = actionsArray.map((action, index) => `Step ${index + 1}: ${action}`).join('. ');
        return stepsString;
    }
}

export default Formatting;