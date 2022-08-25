#!/bin/zsh

echo $1 $2

cd src

cp -R residenceImage $1

cd $1
ls

mv residenceImage.controller.spec.ts $1.controller.spec.ts
mv residenceImage.controller.ts $1.controller.ts

mv residenceImage.module.ts $1.module.ts

mv residenceImage.service.spec.ts $1.service.spec.ts
mv residenceImage.service.ts $1.service.ts

sed -i "s/residenceImage/$1/g" *.ts
sed -i "s/residenceImage/$2/g" *.ts

cd dto
ls

mv residenceImage.dto.ts $1.dto.ts
mv create-residenceImage.dto.ts create-$1.dto.ts
mv filter-residenceImage.dto.ts filter-$1.dto.ts
mv update-residenceImage.dto.ts update-$1.dto.ts

sed -i "s/residenceImage/$1/g" *
sed -i "s/residenceImage/$2/g" *