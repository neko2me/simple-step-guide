# Angular 2+ Simple Step Guide Component

This is craeted by ng-packagr on Angular6.

## Installation

```
npm install angular-simple-step-guide --save
```

## Usage

### In Module:

#### App Module

```typescript
import {SimpleStepGuideModule} from "angular-simple-step-guide";

@NgModule({
	imports: [SimpleStepGuideModule]
})
```

or

#### Shared Module

```typescript
import {SimpleStepGuideModule} from "angular-simple-step-guide";

@NgModule({
	imports: [SimpleStepGuideModule],
	exports: [SimpleStepGuideModule]

})
```

### In Component:

#### Template

```html
<simple-step-guide [guides]="guides" [options]="options"></simple-step-guide>
```

#### Component Class

```typescript
guides = [
  {id: "elementId", message: "text message."},
  ...
];
options = {
  ...
};
```

### "guides" Property values:

|||
-|-
|**id**|Target element id.|
|**message**|Display message.|

### "options" Property values:

|||
-|-
|**next**|"Next" button text.|
|**skip**|"Skip" button text.|
|**complete**|"Complete" button text.|
|**intercept**|Function is called before go to next step.|
|**color**|Base color. format is only "#xxxxxx".|

### Other Properties:

|||
-|-
|**completed**|Output bind, called on Completed.|


### Demo

```
npm run start
```

or

[demo on sandbox](https://codesandbox.io/s/mqy05z5qqx)

