<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use BezhanSalleh\FilamentShield\Support\Utils;
use Spatie\Permission\PermissionRegistrar;

class ShieldSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $rolesWithPermissions = '[{"name":"super_admin","guard_name":"web","permissions":["view_classroom","view_any_classroom","create_classroom","update_classroom","restore_classroom","restore_any_classroom","replicate_classroom","reorder_classroom","delete_classroom","delete_any_classroom","force_delete_classroom","force_delete_any_classroom","view_learning::module","view_any_learning::module","create_learning::module","update_learning::module","restore_learning::module","restore_any_learning::module","replicate_learning::module","reorder_learning::module","delete_learning::module","delete_any_learning::module","force_delete_learning::module","force_delete_any_learning::module","view_role","view_any_role","create_role","update_role","delete_role","delete_any_role","view_task","view_any_task","create_task","update_task","restore_task","restore_any_task","replicate_task","reorder_task","delete_task","delete_any_task","force_delete_task","force_delete_any_task","view_user","view_any_user","create_user","update_user","restore_user","restore_any_user","replicate_user","reorder_user","delete_user","delete_any_user","force_delete_user","force_delete_any_user","widget_StatsOverview","widget_TaskSubmissionTable"]},{"name":"teacher","guard_name":"web","permissions":["view_classroom","view_any_classroom","create_classroom","update_classroom","restore_classroom","restore_any_classroom","replicate_classroom","reorder_classroom","delete_classroom","delete_any_classroom","force_delete_classroom","force_delete_any_classroom","view_learning::module","view_any_learning::module","create_learning::module","update_learning::module","restore_learning::module","restore_any_learning::module","replicate_learning::module","reorder_learning::module","delete_learning::module","delete_any_learning::module","force_delete_learning::module","force_delete_any_learning::module","view_task","view_any_task","create_task","update_task","restore_task","restore_any_task","replicate_task","reorder_task","delete_task","delete_any_task","force_delete_task","force_delete_any_task","view_user","view_any_user","delete_user","widget_StatsOverview","widget_TaskSubmissionTable"]},{"name":"student","guard_name":"web","permissions":["view_classroom","view_any_classroom","create_classroom","update_classroom","restore_classroom","restore_any_classroom","replicate_classroom","reorder_classroom","delete_classroom","delete_any_classroom","force_delete_classroom","force_delete_any_classroom","view_learning::module","view_any_learning::module","create_learning::module","update_learning::module","restore_learning::module","restore_any_learning::module","replicate_learning::module","reorder_learning::module","delete_learning::module","delete_any_learning::module","force_delete_learning::module","force_delete_any_learning::module","view_task","view_any_task","create_task","update_task","restore_task","restore_any_task","replicate_task","reorder_task","delete_task","delete_any_task","force_delete_task","force_delete_any_task","view_user","view_any_user"]}]';
        $directPermissions = '[]';

        static::makeRolesWithPermissions($rolesWithPermissions);
        static::makeDirectPermissions($directPermissions);

        $this->command->info('Shield Seeding Completed.');
    }

    protected static function makeRolesWithPermissions(string $rolesWithPermissions): void
    {
        if (! blank($rolePlusPermissions = json_decode($rolesWithPermissions, true))) {
            /** @var Model $roleModel */
            $roleModel = Utils::getRoleModel();
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($rolePlusPermissions as $rolePlusPermission) {
                $role = $roleModel::firstOrCreate([
                    'name' => $rolePlusPermission['name'],
                    'guard_name' => $rolePlusPermission['guard_name'],
                ]);

                if (! blank($rolePlusPermission['permissions'])) {
                    $permissionModels = collect($rolePlusPermission['permissions'])
                        ->map(fn ($permission) => $permissionModel::firstOrCreate([
                            'name' => $permission,
                            'guard_name' => $rolePlusPermission['guard_name'],
                        ]))
                        ->all();

                    $role->syncPermissions($permissionModels);
                }
            }
        }
    }

    public static function makeDirectPermissions(string $directPermissions): void
    {
        if (! blank($permissions = json_decode($directPermissions, true))) {
            /** @var Model $permissionModel */
            $permissionModel = Utils::getPermissionModel();

            foreach ($permissions as $permission) {
                if ($permissionModel::whereName($permission)->doesntExist()) {
                    $permissionModel::create([
                        'name' => $permission['name'],
                        'guard_name' => $permission['guard_name'],
                    ]);
                }
            }
        }
    }
}
