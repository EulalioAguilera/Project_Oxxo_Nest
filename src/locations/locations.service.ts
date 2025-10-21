import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Location } from "./entities/location.entity";
import { Manager } from "src/managers/entities/manager.entity";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne({
      where: { locationId: id as unknown as string },
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    await this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location: null })
      .where("locationId = :id", { id })
      .execute();

    const location = await this.locationRepository.preload({
      ...(updateLocationDto as any),
      locationId: id as unknown as string,
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    const savedLocation = await this.locationRepository.save(location);

    if (updateLocationDto.manager) {
      const updatedManager = await this.managerRepository.preload({
        managerId: updateLocationDto.manager as any,
        location: savedLocation,
      });

      if (!updatedManager) {
        throw new NotFoundException(
          `Manager with ID ${updateLocationDto.manager} not found`,
        );
      }

      await this.managerRepository.save(updatedManager);
    }

    return savedLocation;
  }

  async remove(id: number) {
    const result = await this.locationRepository.delete({
      locationId: id as unknown as string,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return { message: `Location with ID ${id} deleted successfully` };
  }
}
