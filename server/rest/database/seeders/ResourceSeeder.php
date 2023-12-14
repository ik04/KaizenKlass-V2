<?php

namespace Database\Seeders;

use App\Enums\Resource as EnumsResource;
use App\Models\Resource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $relativePath = __DIR__ . "/init/resources.json";
          $resources = file_get_contents($relativePath);
            $resources = json_decode($resources);
            $resource = $resources->resource;
            foreach($resource as $resourceItem){
                Resource::create([
                    "title" => $resourceItem->title,
                    "link" => $resourceItem->link,
                    "description" => $resourceItem->description,
                    "type"=>EnumsResource::RESOURCE->value,
                    "resource_uuid" => Uuid::uuid4()
                ]);
            }

            $tracker = $resources->tracker;
            foreach($tracker as $resourceItem){
                Resource::create([
                    "title" => $resourceItem->title,
                    "link" => $resourceItem->link,
                    "description" => $resourceItem->description,
                    "type"=>EnumsResource::TRACKER->value,
                    "resource_uuid" => Uuid::uuid4()
                ]);
            }
    }
}
