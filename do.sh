#!/bin/zsh

echo $1 $2

cd src

cp -R category $1

cd $1
ls

mv category.controller.spec.ts $1.controller.spec.ts
mv category.controller.ts $1.controller.ts

mv category.module.ts $1.module.ts

mv category.service.spec.ts $1.service.spec.ts
mv category.service.ts $1.service.ts

sed -i "s/category/$1/g" *.ts
sed -i "s/Category/$2/g" *.ts

cd dto
ls

mv category.dto.ts $1.dto.ts
mv create-category.dto.ts create-$1.dto.ts
mv filter-category.dto.ts filter-$1.dto.ts
mv update-category.dto.ts update-$1.dto.ts

sed -i "s/category/$1/g" *
sed -i "s/Category/$2/g" *